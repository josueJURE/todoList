const userInput = document.getElementById("userInput");
const add = document.getElementById("add");
const reset = document.querySelector(".fa-trash-restore-alt");
const moveTopOrBottom = document.querySelector(".moveTopOrBottom");
const arrowUp = document.querySelector(".fa-arrow-up");
const arrowDown = document.querySelector(".fa-arrow-down");
const numberOfTasks = document.querySelector(".numberOfTasks");

window.addEventListener("load", loadTasksFromLocalStorage);
add.addEventListener("click", addTaskToList);

taskList.addEventListener("click", crossTaskOut);
taskList.addEventListener("click", deleteTask);
arrowUp.addEventListener("click", scrollAllTheWayUp);
arrowDown.addEventListener("click", scrollAllTheWayDown);

reset.addEventListener("click", deleteAllTasks);

const DEBUG = false;

function deleteAllTasks() {
  if (DEBUG) {
    console.log("deleteAllTasks");
  }

  if (taskList.innerHTML === "") {
    alert("you have no task in your todo list");
    return;
  }
  taskList.innerHTML = "";
  localStorage.clear();
  const tasks = getTasksFromLocalStorage();
  numberOfTasks.innerHTML = numberOfTasksUserHas(tasks.length);
}

function addTaskToList() {
  const tasks = getTasksFromLocalStorage();
  if (DEBUG) {
    console.log("addTaskToList");
  }

  if (userInput.value === "") {
    alert("please fill in input box");
    return;
  }

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
  <div class="row dropzone" data-id="${task.id}" draggable="true">
     <div>${generateDigitForEachTask(task.id)}</div>
     <input type="checkbox" />
     <div>${task.text}</div>
     <i class="fa-solid fa-trash"></i>
     <i class="fas fa-edit"></i>
  </div>`;
  userInput.value = "";

  const editIcons = taskList.querySelectorAll(".fa-edit");
  console.log(editIcons);
  editIcons.forEach((editIcon) =>
    editIcon.addEventListener("click", editContent)
  );

  if (DEBUG) {
    console.log("addTaskToList:", "taskList.children:", taskList.children);
  }
  updateNumbersAfterDraggingOrDeletingAtask(taskList.children);
  updateMoveTopBottomVisibility(taskList.children.length);

  console.log(taskList.children.length);
}

userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTaskToList();
  }
});

function crossTaskOut(e) {
  if (DEBUG) {
    console.log("crossTaskOut");
  }

  let target = e.target;
  if (target.tagName === "INPUT") {
    const tasks = getTasksFromLocalStorage();
    const id = target.parentElement.dataset.id;
    const completed = target.checked;
    toggleTaskCompletionInLocalStorage(id, completed);
    target.nextElementSibling.classList.toggle("lineThrough");
    numberOfTasks.innerHTML = numberOfTasksUserHas(tasks.length);
  }
}

function deleteTask(e) {
  if (DEBUG) {
    console.log("deleteTask");
  }

  let target = e.target;
  const container = document.querySelectorAll("#taskList > div");
  container.length;
  if (target.classList.contains("fa-trash")) {
    const id = target.parentElement.dataset.id;
    deleteTaskFromLocalStorage(id);
    // alert("deleting a task can't be undone");
    target.parentElement.remove();
    const tasks = getTasksFromLocalStorage();
    numberOfTasks.innerHTML = numberOfTasksUserHas(tasks.length);
    updateNumbersAfterDraggingOrDeletingAtask(container);
    updateMoveTopBottomVisibility(container.length);
  }
}

function loadTasksFromLocalStorage() {
  if (DEBUG) {
    console.log("loadTasksFromLocalStorage");
  }

  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => {
    console.log(taskList);
    taskList.innerHTML += `
   
    <div class="row dropzone" data-id="${task.id}" draggable="true">
      <div>${generateDigitForEachTask(task.id)}</div>
       <input type="checkbox" ${task.completed ? "checked" : ""} />
       <div class="${task.completed ? "lineThrough" : ""}">${task.text}</div>
       <i class="fa-solid fa-trash"></i>
       <i class="fas fa-edit"></i>
    </div>`;

    numberOfTasks.innerHTML = numberOfTasksUserHas(tasks.length);

    const draggableElementsArray = document.querySelectorAll(".dropzone");
    console.log(draggableElementsArray);
  });

  // taskList.addEventListener("click", editContent);

  if (DEBUG) {
    console.log("loadTasksFromLocalStorage:", "# of tasks:", tasks.length);
  }

  updateMoveTopBottomVisibility(tasks.length);
}

function addTaskToLocalStorage(task) {
  if (DEBUG) {
    console.log("addTaskToLocalStorage");
  }

  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  numberOfTasks.innerHTML = numberOfTasksUserHas(tasks.length);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTaskCompletionInLocalStorage(id, completed) {
  if (DEBUG) {
    console.log("toggleTaskCompletionInLocalStorage");
  }

  const tasks = getTasksFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === Number(id));
  console.log(index);
  tasks[index].completed = completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(id) {
  if (DEBUG) {
    console.log("deleteTaskFromLocalStorage");
  }

  const tasks = getTasksFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === Number(id));
  tasks.splice(index, 1);
  numberOfTasks.innerHTML = numberOfTasksUserHas(tasks.length);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  if (DEBUG) {
    console.log("getTasksFromLocalStorage");
  }

  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function editContent(e) {
  console.log("editContent()");
  const element = e.target;
  if (element.classList.contains("fa-edit")) {
    const prevSibling = element.previousElementSibling.previousElementSibling;

    prevSibling.parentElement.addEventListener("mouseover", function (e) {
      const index = tasks.findIndex(
        (task) => task.id === Number(e.srcElement.dataset.id)
      );
      if (index !== -1) {
        prevSibling.contentEditable = true;
        const tasks = getTasksFromLocalStorage();
        tasks[index].text = prevSibling.textContent;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    });
    prevSibling.contentEditable = false;
  }
}

function generateDigitForEachTask(id) {
  if (DEBUG) {
    console.log("generateDigitForEachTask");
  }

  const tasks = getTasksFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === Number(id));
  return index + 1;
}

new Sortable(taskList, {
  animation: 150,
  onEnd: function (evt) {
    if (DEBUG) {
      console.log("Sortable.onEnd");
    }

    const parentContainer = evt.to;
    const parentContainerChildren = Array.from(parentContainer.children);
    updateNumbersAfterDraggingOrDeletingAtask(parentContainerChildren);

    const tasks = getTasksFromLocalStorage();
    const oldIndex = evt.oldDraggableIndex;
    let newIndex = evt.newDraggableIndex;

    const dragged = tasks[oldIndex];

    tasks.splice(oldIndex, 1);
    tasks.splice(newIndex, 0, dragged);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  },
});

function updateNumbersAfterDraggingOrDeletingAtask(arr) {
  if (DEBUG) {
    console.log("updateNumbersAfterDraggingOrDeletingAtask");
  }

  for (var i = 0; i < arr.length; i++) {
    arr[i].firstElementChild.innerHTML = i + 1;
  }
}

function checkForDuplicates() {
  if (DEBUG) {
    console.log("checkForDuplicates");
  }

  const tasks = getTasksFromLocalStorage();
  return tasks.findIndex((task) => task.text === userInput.value);
}

function updateMoveTopBottomVisibility(numberOfItems) {
  if (DEBUG) {
    console.log("setMoveTopBottomVisibility:", "# of items:", numberOfItems);
  }

  if (numberOfItems < 8) {
    if (!moveTopOrBottom.classList.contains("hideBar")) {
      moveTopOrBottom.classList.add("hideBar");
    }
  } else {
    moveTopOrBottom.classList.remove("hideBar");
  }
}

function scrollAllTheWayUp() {
  if (DEBUG) {
    console.log("scrollAllTheWayUp");
  }

  taskList.scroll({
    top: 0,
    behavior: "smooth",
  });
}

function scrollAllTheWayDown() {
  if (DEBUG) {
    console.log("scrollAllTheWayDown");
  }

  taskList.scroll({
    top: taskList.scrollHeight,
    behavior: "smooth",
  });
}

function numberOfTasksUserHas(arrayLength) {
  return arrayLength < 2
    ? ` you have completed ${numberOfTasksUserHasCompleted()} of ${arrayLength} tasks`
    : `you have completed ${numberOfTasksUserHasCompleted()} of ${arrayLength} tasks`;
}

function numberOfTasksUserHasCompleted() {
  const tasks = getTasksFromLocalStorage();
  completedTasks = tasks.filter((task) => task.completed);
  return completedTasks.length;
}

checkForDuplicates();
