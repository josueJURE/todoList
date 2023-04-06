const userInput = document.getElementById("userInput");
const add = document.getElementById("add");
const taskList = document.getElementById("taskList");

add.addEventListener("click", addTaskToList);
taskList.addEventListener("click", crossTaskOut);

function addTaskToList() {
  taskList.innerHTML += `
     <div class=row>
    <input type="checkbox" />
    <div >${userInput.value}</div>
    <i class="fa-solid fa-trash"></i>
     </div>`;
  userInput.value = "";
}

userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTaskToList();
  }
});

function crossTaskOut(e) {
  let target = e.target;
  if (target.tagName === "INPUT") {
    target.nextElementSibling.classList.toggle("lineThrough");
  }
}

function deleteTask(e) {
  let target = e.target;
  if (target.tagName === "i") {
    target.previousElementSibling.remove();
    target.remove();
  }
}
