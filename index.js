const userInput = document.getElementById("userInput");
const button = document.getElementById("button");
const taskList = document.getElementById("taskList");

button.addEventListener("click", addTaskToList);

function addTaskToList() {
  const element = document.createElement("div");
  element.textContent = "";
  element.textContent = userInput.value;
  taskList.appendChild(element);
}

document.addEventListener("keydown", function (e) {
  if (e.key === 13) {
    addTaskToList();
  }
});

// userInput.addEventListener('keydown', function(event) {
//     if (event.keyCode === 13) {
//         addTaskToList();
//     }
// });
