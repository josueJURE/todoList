const userInput = document.getElementById("userInput");
const add = document.getElementById("add");
const taskList = document.getElementById("taskList");

add.addEventListener("click", addTaskToList);

function addTaskToList() {
  const element = document.createElement("div");
  element.textContent = userInput.value;
  taskList.appendChild(element);
  userInput.value = "";
}

userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTaskToList();
  }
});

