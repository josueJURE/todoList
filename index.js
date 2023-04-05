const userInput = document.getElementById("userInput");
const add = document.getElementById("add");
const taskList = document.getElementById("taskList");

add.addEventListener("click", addTaskToList);

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
