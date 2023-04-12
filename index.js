const userInput = document.getElementById("userInput");
const add = document.getElementById("add");

add.addEventListener("click", addTaskToList);
taskList.addEventListener("click", crossTaskOut);
window.addEventListener("load", loadTasksFromLocalStorage);

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

  addTaskToLocalStorage(task)

  taskList.innerHTML += `
  <div class="row" data-id="${task.id}">
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
    const taskDone = target.checked;
    toggleTaskCompletionInLocalStorage(id, completed);
    target.nextElementSibling.classList.toggle("lineThrough");
  }
}

function deleteTask(e) {
  let target = e.target;
  if (target.classList.contains("fa-trash")) {
    console.log("josue");
    alert("deleting a task can't be undone");
    target.parentElement.remove();
  }
}

function loadTasksFromLocalStorage() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(task => {
    taskList.innerHTML += `
    <div class="row" data-id="${task.id}">
       <input type="checkbox" ${task.completed ? 'checked' : ''} />
       <div class="${task.completed ? 'lineThrough' : ''}">${task.text}</div>
       <i class="fa-solid fa-trash"></i>
    </div>`;
  })
}

function addTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}
