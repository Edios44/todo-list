import { Item, TodoList } from "./todotemplate.js";
import { format, compareAsc, endOfToday } from "date-fns";

import {newTask,changeTaskTitle,changeTaskDate,removeTask} from './tasks.js'

const defaultList = new TodoList("defaultList", "this is a default list");
const lists = [defaultList];
defaultList.addItem(
  "example item",
  "example description example description",
  format(endOfToday(),'yyyy-MM-dd'),
  "2",
  0
);
defaultList.addItem("example item2",
  "desc desc",
  format(endOfToday(),'yyyy-MM-dd'),
  "4",
  1
);

let currentList = lists[0];
console.log(currentList);

const doms = (function () {
  const sidebar = document.querySelector("#sidebar");
  const addlistform = document.querySelector("#addlist");
  const bgdisable = document.querySelector("#bg-disable");
  const newlist_btn = document.querySelector("#newlist");
  const close_btn = document.querySelector("#close-btn");
  const content = document.querySelector("#content");
  const confirm_btn = document.querySelector("#confirm-btn");
  const lists = document.querySelector("#lists");
  const todo = document.querySelector("#todolists");
  return {
    sidebar,
    content,
    addlistform,
    bgdisable,
    newlist_btn,
    close_btn,
    confirm_btn,
    lists,
    todo,
  };
})();

function newList(title, description) {
  const list = new TodoList(title, description);
  lists.push(list);
}

function displayLists(lists) {
  doms.lists.textContent = "";
  let i = 0;
  const ul = document.createElement("ul");
  lists.forEach((list) => {
    const li = document.createElement("li");
    li.textContent = list.title;
    li.id = i;
    ul.appendChild(li);
    i++;
  });
  doms.lists.appendChild(ul);

  doms.lists.addEventListener("click", (e) => {
    currentList = lists[Number(e.target.id)];
    displayContent(currentList);
  });
}

function confirmBtn() {
  event.preventDefault();
  const titleField = document.querySelector("#titleField");
  const descriptionField = document.querySelector("#descriptionField");

  newList(titleField.value, descriptionField.value);
  displayLists(lists);
  titleField.value = "";
  descriptionField.value = "";
  closeBtn();
}

function closeBtn() {
  event.preventDefault();
  doms.addlistform.style.display = "none";
  doms.bgdisable.style.display = "none";
}

function newListForm() {
  doms.newlist_btn.addEventListener("click", () => {
    doms.addlistform.style.display = "block";
    doms.bgdisable.style.display = "block";
    doms.close_btn.addEventListener("click", closeBtn);
    doms.confirm_btn.addEventListener("click", confirmBtn);
  });
}

function displayContent(currentList) {
  const list = document.createElement("ul");
  list.id = "tasks";
  doms.todo.textContent = "";

  currentList.list.forEach((obj,indx) => {
    const li = document.createElement("li");
    li.classList.add("task-list");
    const title = document.createElement("span");
    title.classList.add("task-title");
    title.textContent = obj.title;
    title.addEventListener("click",(e) => {changeTaskTitle(e,obj)},{ once: true });

    const dueDate = document.createElement("span");
    dueDate.textContent = obj.dueDate
    dueDate.classList.add('due-date')
    dueDate.addEventListener('click', (e)=> {changeTaskDate(e,obj)})

    const removeTask_btn = document.createElement("button");
    removeTask_btn.classList.add("remove-btn");
    removeTask_btn.textContent = "X";
    removeTask_btn.addEventListener("click", () => {removeTask(indx)});

    li.appendChild(title);
    li.appendChild(dueDate);
    li.appendChild(removeTask_btn);
    list.appendChild(li);
  });
  doms.todo.appendChild(list);
  const addItem_btn = document.createElement("button");
  addItem_btn.textContent = "+ Add task";
  addItem_btn.classList.add("btn-new");
  addItem_btn.id = "new-task";
  doms.todo.appendChild(addItem_btn);
  addItem_btn.addEventListener("click", (e) => {newTask(e)});

  doms.content.appendChild(doms.todo);
}


export {
  newList,
  newListForm,
  displayLists,
  lists,
  displayContent,
  currentList,
};
