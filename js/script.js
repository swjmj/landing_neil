function pagination(current, next) {
  current.style.display = "none";
  next.style.display = "block";
  setTimeout(() => {
    animation = false;
  }, 1000);
}

function paginatorFunc(event) {
  console.log(move);
  console.log(animation);
  if (
    (this.id == "first" && event.deltaY < 0) ||
    (this.id == "first" && move < 0)
  ) {
    animation = false;
    return;
  }
  if (
    (this.id == "third_main" && event.deltaY > 0) ||
    (this.id == "third_main" && move > 0)
  ) {
    animation = false;
    return;
  }
  if (animation) {
    // animation = false;
    return;
  }
  event.preventDefault();

  animation = true;

  if ((this.id == "first" && event.deltaY > 0) || move > 0) {
    current = document.getElementById("first");
    next = document.getElementById("second");
    pagination(current, next);
  }
  if ((this.id == "second" && event.deltaY > 0) || move > 0) {
    current = document.getElementById("second");
    next = document.getElementById("third");
    pagination(current, next);
  }
  if ((this.id == "third_main" && event.deltaY < 0) || move < 0) {
    current = document.getElementById("third");
    next = document.getElementById("second");
    pagination(current, next);
  }
  if ((this.id == "second" && event.deltaY < 0) || move < 0) {
    current = document.getElementById("second");
    next = document.getElementById("first");
    pagination(current, next);
  }
  // if ((this.id == "second" && event.deltaY > 0)|| move > 0) {
  //   current = document.getElementById("second");
  //   next = document.getElementById("third");
  //   pagination(current, next);
  // }
}

// function to change pages with button
function buttonChange(event) {
  let current = event.target.parentNode.id;

  if (animation) {
    // animation = false;
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

//----------------------------------------------------------
let animation = false;
let aLim;
let bLim;
let move;
let page = document.getElementById("first");
page.addEventListener("wheel", paginatorFunc);

page.addEventListener("touchstart", (event) => {
  aLim = event.changedTouches[0].clientY;
  // console.log("start", move);
});
page.addEventListener("touchend", (event) => {
  // console.log("end", event.changedTouches[0].clientY);
  bLim = event.changedTouches[0].clientY;
  move = bLim - aLim;
  // console.log("total", move);
  paginatorFunc(event);
});
page.addEventListener("touchmove", (event) => {
  event.preventDefault;
});

let page1 = document.getElementById("second");
page1.onwheel = paginatorFunc;

let page2 = document.getElementById("third_main");
page2.onwheel = paginatorFunc;

// Floating button for clisk to next page
let button = document.createElement("div");
let button1 = document.createElement("div");

button.setAttribute("class", "floatButton");
button1.setAttribute("class", "floatButton");
const buttonText = "Scroll or Click Here";
button.innerHTML = `${buttonText} 
<object type="image/svg+xml" data="IMG/arrow.svg" class="arrowButton">
Your browser does not support SVGs</object>`;
button1.innerHTML = `${buttonText} 
<object type="image/svg+xml" data="IMG/arrow.svg" class="arrowButton">
Your browser does not support SVGs</object>`;

page.appendChild(button);
page1.appendChild(button1);

button.addEventListener("click", buttonChange);
button1.addEventListener("click", buttonChange);
document
  .getElementsByClassName("arrowButton")[0]
  .addEventListener("click", buttonChange);
