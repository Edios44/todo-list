import { Item, TodoList } from "./todotemplate.js";
import { format, compareAsc, endOfToday } from "date-fns";
import {displayContent,currentList} from './todomanipulation.js'

function confirmNewTask(e, title, date) {
  if (event.key == "Enter") {
    currentList.addItem(title, "dummy desc", date, 4, currentList.length)
    displayContent(currentList);
  }

  if (event.key == "Escape") {
    displayContent(currentList)
    }
}

function confirmTaskTitle(e,task) {
  if (event.key == 'Enter'){
    task.title = e.target.value
    displayContent(currentList)
  }
  if (event.key == 'Escape') {
    displayContent(currentList)
  }
}
function confirmTaskDate(e,task) {
  if (e.key == 'Enter') {
    task.dueDate = e.target.value
    displayContent(currentList)
  }
  if (e.key == 'Escape') {
    displayContent(currentList)
  }
}

const newTask = function newTask(e) {
  const newli = document.createElement("li");
  newli.classList.add("task-list");

  const input = document.createElement("input");
  input.classList.add("input");
  input.setAttribute("type", "text");
  newli.appendChild(input);

  const dateli = document.createElement("input");
  dateli.setAttribute("type", "date");
  dateli.classList.add("date-selector");
  dateli.value = format(endOfToday(),'yyyy-MM-dd')
  newli.appendChild(dateli);
  const tasks = document.querySelector('#tasks')
  tasks.appendChild(newli)

  newli.addEventListener("keydown", (e) => {
    confirmNewTask(e, input.value, dateli.value);
  });
}

const changeTaskTitle = function changeTaskTitle(e,task) {
  const input = document.createElement('input')
  input.classList.add('input')
  input.setAttribute('type','text')
  input.value = e.target.textContent
  e.target.textContent = ''
  e.target.appendChild(input)
  input.addEventListener('keydown', (e) => {
    confirmTaskTitle(e,task)
  })
}

const changeTaskDate = function changeTaskDate(e,task) {
  const date = document.createElement("input")
  date.setAttribute('type','date')
  date.value = task.dueDate
  e.target.textContent = ''
  e.target.appendChild(date)
  date.addEventListener('keydown', (e) => {
    confirmTaskDate(e,task)
  })
}

const removeTask = function removeTask(indx) {
  console.log(indx);
  currentList.list.splice(Number(indx), 1);
  console.log(currentList.list);
  displayContent(currentList);
}

export {newTask,changeTaskTitle,changeTaskDate,removeTask}
