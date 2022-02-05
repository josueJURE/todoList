
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");

inputBox.onkeyup = () => {
  let userData = inputBox.value;
  if(userData.trim()! = 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
}

addBtn.onclick = () => {
  let userData = inputBox.value
  let getLocalStorage = getLocalStorage.getItem("New Todo");
  if(getLocalStorage == null) {
    listArr = []
  } else {
    listArr = JSON.parse(getLocalStorage)
  }
  listArr.push(userData);
  localStorage.setItem("new Todo", JSON.stringify(listArr))
}
