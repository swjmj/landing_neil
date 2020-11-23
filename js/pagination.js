//the actual change of page
function pagination(currentPage, nextPage) {
  currentPage.style.display = "none";
  nextPage.style.display = "block";
  setTimeout(() => {
    animation = false;
  }, 1000);

  //get the current unhidden page, the number 3 in the for loop is the number of pages to display
  for (let element = 0; element < 3; element++) {
    window.getComputedStyle(pages[element]).display == "block"
      ? (current = element)
      : null;
  }
}

//Function that makes the call to the page change
function paginatorFunc(currentPage, nextPage) {
  if (animation) {
    return;
  }

  animation = true;

  pagination(currentPage, nextPage);
}

// This function decides where to change the page and if applicable
function actionDecide(e) {
  if (e.type == "wheel" && e.deltaY > 0) {
    if (current < 2) {
      next = current + 1;
      currentPage = pages[current];
      nextPage = pages[next];
      paginatorFunc(currentPage, nextPage);
    }
  }
  if (e.type == "wheel" && e.deltaY < 0) {
    if (current > 0) {
      next = current - 1;
      currentPage = pages[current];
      nextPage = pages[next];
      paginatorFunc(currentPage, nextPage);
    }
  }
  if (e.type == "touchend" && bLim - aLim < 0) {
    if (current < 2) {
      next = current + 1;
      currentPage = pages[current];
      nextPage = pages[next];
      paginatorFunc(currentPage, nextPage);
    }
  }
  if (e.type == "touchend" && bLim - aLim > 0) {
    if (current > 0) {
      next = current - 1;
      currentPage = pages[current];
      nextPage = pages[next];
      paginatorFunc(currentPage, nextPage);
    }
  }
  aLim = 0;
  bLim = 0;
}

// function to change pages with button
function buttonChange(event) {
  let current = event.target.parentNode.id;
  if (animation) {
    return;
  }

  animation = true;

  if (current == "first") {
    current = document.getElementById("first");
    next = document.getElementById("second");
    pagination(current, next);
  }

  if (current == "second") {
    current = document.getElementById("second");
    next = document.getElementById("third");
    pagination(current, next);
  }
}

//Start of the definitions necessary

let pageClass = document.getElementsByClassName("pageToChange");

let pageArr = Array.from(pageClass);
let animation = false;

const pages = {
  first: 0,
  second: 1,
  third_main: 2,
  0: document.getElementById("first"),
  1: document.getElementById("second"),
  2: document.getElementById("third"),
};
let current = 0;
let next;
let aLim;
let bLim;

pageArr.forEach((element) => {
  element.addEventListener("wheel", actionDecide, { passive: true });
  // Scroll functionality
  element.addEventListener(
    "touchstart",
    (e) => {
      aLim = e.changedTouches[0].clientY;
    },
    { passive: true }
  );
  element.addEventListener(
    "touchend",
    (e) => {
      bLim = e.changedTouches[0].clientY;
      if (bLim - aLim != 0) {
        actionDecide(e);
      }
    },
    { passive: true }
  );
});

// Floating button for click to next page
let button = document.createElement("div");
let button1 = document.createElement("div");

button.setAttribute("class", "floatButton");
button1.setAttribute("class", "floatButton");
const buttonText = "Scroll or Click Here";
button.innerHTML = `${buttonText} 
                    <svg version="1.1" class="arrowButton" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 407.4 407.4" style="enable-background:new 0 0 407.4 407.4;" xml:space="preserve">
                    <style type="text/css">
                    .st0{fill:#FFFFFF;}
                    .st1{fill:#FCFCFC;}
                    </style>
                    <g>
                    <polygon class="st0" points="203.7,322.9 21.2,141 0,162.2 203.7,365.3 407.4,162.2 386.3,141 	"/>
                    <polygon class="st1" points="407.4,63.4 386.3,42.2 203.7,224.1 21.2,42.2 0,63.4 203.7,266.5 	"/>
                    </g>
                    </svg>`;
button1.innerHTML = `${buttonText} 
<svg version="1.1" class="arrowButton" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 407.4 407.4" style="enable-background:new 0 0 407.4 407.4;" xml:space="preserve">
<style type="text/css">
.st0{fill:#FFFFFF;}
.st1{fill:#FCFCFC;}
</style>
<g>
<polygon class="st0" points="203.7,322.9 21.2,141 0,162.2 203.7,365.3 407.4,162.2 386.3,141 	"/>
<polygon class="st1" points="407.4,63.4 386.3,42.2 203.7,224.1 21.2,42.2 0,63.4 203.7,266.5 	"/>
</g>
</svg>`;

pageArr[0].appendChild(button);
pageArr[1].appendChild(button1);

button.addEventListener("click", buttonChange);
button1.addEventListener("click", buttonChange);

// for the worker--------------------------------------------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
