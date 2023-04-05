const userInput = document.getElementById("userInput");
const button = document.getElementById("button");
const taskList = document.getElementById("taskList");

button.addEventListener('click', addTaskToList);

function addTaskToList() {
    const element = document.createElement("div");
    element.textContent = userInput.value;
    taskList.appendChild(element);
    element.textContent = " ";
}