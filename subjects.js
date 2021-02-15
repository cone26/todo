const button = document.querySelector(".js-button"),
  form = document.querySelector(".js-form"),
  toDoInput = document.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const SHOWING__CN = "showing";
const TODOS__LS = "toDos";
const BTNSTYLE__CS = "btnStyle";

let toDos = [];

function buttonClickHandler() {
  form.classList.add(SHOWING__CN);
}

function deltoDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDo = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDo;
  saveToDos();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const xBtn = document.createElement("button");

  const newId = toDos.length + 1;

  xBtn.addEventListener("click", deltoDo);
  xBtn.innerText = "✖";

  span.innerText = text;
  toDoList.appendChild(li);
  li.appendChild(span);

  li.appendChild(xBtn);

  xBtn.classList.add(BTNSTYLE__CS);

  xBtn.classList.add("xbtn");

  li.id = newId;

  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS__LS, JSON.stringify(toDos));
}

function handleSubmit(event) {
  event.preventDefault();
  const currnetValue = toDoInput.value;
  paintToDo(currnetValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS__LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  button.addEventListener("click", buttonClickHandler);
  form.addEventListener("submit", handleSubmit);
  loadToDos();
}

init();
