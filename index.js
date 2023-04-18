const userInput = document.getElementById("userInput");
const add = document.getElementById("add");
const button = document.querySelector(".fa-trash-restore-alt");
console.log(button);

window.addEventListener("load", loadTasksFromLocalStorage);
add.addEventListener("click", addTaskToList);
taskList.addEventListener("click", crossTaskOut);
taskList.addEventListener("click", deleteTask);

button.addEventListener("click", deleteAllTasks);

function deleteAllTasks() {
  if (taskList.innerHTML === "") {
    alert("you have no task in your todo list");
    return;
  }
  taskList.innerHTML = "";
  localStorage.clear();
}

function addTaskToList() {
  if (userInput.value === "") {
    alert("please fill in input box");
    return;
  }

  const tasks = getTasksFromLocalStorage();
  const doesTaskExist = tasks.some((task) => task.text === userInput.value);
  if (doesTaskExist) {
    alert("This task already exists in your to-do list");
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

function generateDigitForEachTask(id) {
  const tasks = getTasksFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === Number(id));
  return index + 1;
}

new Sortable(taskList, {
  animation: 150,
  onEnd: function (evt) {
    const parentContainer = evt.to;
    const parentContainerChildren = Array.from(parentContainer.children);
    parentContainerChildren.forEach((child, index) => {
      child.firstElementChild.innerHTML = index + 1;
    });
  },
});

function checkForDuplicates() {
  const tasks = getTasksFromLocalStorage();
  return tasks.findIndex((task) => task.text === userInput.value);
}

checkForDuplicates();
