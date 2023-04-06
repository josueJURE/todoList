const userInput = document.getElementById("userInput");
const add = document.getElementById("add");

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

  const icons = document.querySelectorAll(".fa-trash");
  icons.forEach(icon => icon.addEventListener("click", deleteTask))
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
    target.nextElementSibling.classList.toggle("lineThrough");
  }
}

function deleteTask(e) {
  let target = e.target;
  if (target.classList.contains("fa-trash")) {
    console.log("josue");
    alert("deleting a task can't be undone")
    target.parentElement.remove();
  }
}
