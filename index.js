const userInput = document.getElementById("userInput");
const add = document.getElementById("add");
const button = document.querySelector("button")


window.addEventListener("load", loadTasksFromLocalStorage);
add.addEventListener("click", addTaskToList);
taskList.addEventListener("click", crossTaskOut);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("dragstart", dragElement);
taskList.addEventListener("dragover", dragElementOver);
taskList.addEventListener("dragenter", enterElement);
taskList.addEventListener("drop", dropElement);

function addTaskToList() {
  if (userInput.value === "") {
    alert("please fill in input box");
    return;
  }

  const task = {
    id: new Date().getTime(),
    text: userInput.value,
    completed: false,
  };

  addTaskToLocalStorage(task);

  taskList.innerHTML += `
  <div class="row dropzone" data-id="${task.id} draggable="true">
     <div>${generateDigitForEachTask(task.id)}</div>
     <input type="checkbox" />
     <div>${task.text}</div>
     <i class="fa-solid fa-trash"></i>
  </div>`;
  userInput.value = "";

  const icons = document.querySelectorAll(".fa-trash");
  icons.forEach((icon) => icon.addEventListener("click", deleteTask));
  // console.log(icons);
}

userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTaskToList();
  }
});

function crossTaskOut(e) {
  let target = e.target;
  if (target.tagName === "INPUT") {
    const id = target.parentElement.dataset.id;
    const completed = target.checked;
    toggleTaskCompletionInLocalStorage(id, completed);
    target.nextElementSibling.classList.toggle("lineThrough");
  }
}

function deleteTask(e) {
  let target = e.target;
  if (target.classList.contains("fa-trash")) {
    const id = target.parentElement.dataset.id;
    deleteTaskFromLocalStorage(id);
    alert("deleting a task can't be undone");
    target.parentElement.remove();
  }
}

function loadTasksFromLocalStorage() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => {
    taskList.innerHTML += `
   
    <div class="row dropzone"" data-id="${task.id}" draggable="true">
      <div>${generateDigitForEachTask(task.id)}</div>
       <input type="checkbox" ${task.completed ? "checked" : ""} />
       <div class="${task.completed ? "lineThrough" : ""}">${task.text}</div>
       <i class="fa-solid fa-trash"></i>
    </div>`;
  });
}

function addTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTaskCompletionInLocalStorage(id, completed) {
  const tasks = getTasksFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === Number(id));
  tasks[index].completed = completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(id) {
  const tasks = getTasksFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === Number(id));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function dragElement(e) {
  const target = e.target;
  if (target.draggable) {
    const dt = e.dataTransfer;
    dt.setData("text/html", target.innerHTML);
    // dt.dataTransfer.setData("text/plain", target.innerHTML);
    e.dataTransfer.effectAllowed = "move";
  }
}

function dragElementOver(e) {
  const target = e.target;
  if (target.draggable) {
    e.preventDefault();
  }
}

function enterElement(e) {
  const target = e.target;
  if (target.draggable) {
    e.preventDefault();
  }
}

function dropElement(e) {
  e.preventDefault();
  const target = e.target;
  e.dataTransfer.dropEffect = "move";
  if (target.classList.contains("dropzone")) {
    const beingDragged = e.dataTransfer.getData("text/html");
    console.log({ dragged: beingDragged, dropzone: target });
    beingDragged.parentNode.removeChild(beingDragged);
    target.appendChild(beingDragged);
  }
}

/*
https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event
*/

// target.addEventListener("drop", (event) => {
//   // prevent default action (open as link for some elements)
//   event.preventDefault();
//   // move dragged element to the selected drop target
//   if (event.target.className === "dropzone") {
//     dragged.parentNode.removeChild(dragged);
//     event.target.appendChild(dragged);
//   }
// });

function generateDigitForEachTask(id) {
  const tasks = getTasksFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === Number(id));
  return index + 1;
}
