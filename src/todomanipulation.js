import { Item, TodoList } from "./todotemplate.js";
import { format, compareAsc, endOfToday } from "date-fns";

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

function confirmTask(e, task, currentLi, input, date, tasks, id) {
  if (event.key == "Enter") {
    task.title = input.value;
    if (date.value !== undefined) {
      task.dueDate = date.value;
    }
    else{task.dueDate = date }
    currentLi.addEventListener(
      "click",
      (e) => {
        newTask("recursionhh", tasks, task, e);
      },
      { once: true },
    );
    displayContent(currentList);
    console.log(currentList.list)
    sortTasksId();
  }

  if (event.key == "Escape") {
    if (task.title !== undefined) {
      currentLi.textContent = task.title;
      currentLi.addEventListener(
        "click",
        (e) => {
          newTask("hh", tasks, task, e);
        },
        { once: true },
      );
    } else {
      currentLi.remove();
      currentList.list.splice(id, 1);
      console.log(currentList.list);
    }
  }
}

function addTask() {
  const addItem_btn = document.createElement("button");
  addItem_btn.textContent = "+ Add task";
  addItem_btn.classList.add("btn-new");
  addItem_btn.id = "new-task";
  const tasks = document.querySelector("#tasks");
  doms.todo.appendChild(addItem_btn);
  addItem_btn.addEventListener("click", (e) => {
    newTask(tasks, undefined, e);
  });
}

function newTask(tasks, task, e) {
  if (task == undefined) {
    const newli = document.createElement("li");
    newli.id = currentList.list.length;
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

    tasks.appendChild(newli);
    let id = currentList.list.length;
    currentList.addItem(undefined, undefined, undefined, undefined, id);
    currentList.list.map((item) => {
      if (item.id == id) {
        task = item;
        console.log(item);
      }
    });
    newli.addEventListener("keydown", (e) => {
      confirmTask(e, task, newli, input, dateli, tasks, id);
    });
  } else {
    let id = e.target.id;
    const currentLi = document.querySelector(`#todolists ul [id='${id}']`);

    const input = document.createElement("input");
    input.classList.add("input");
    input.setAttribute("type", "text");
    input.value = currentLi.textContent;
    currentLi.textContent = "";
    currentLi.appendChild(input);
    console.log(task.dueDate)
    input.addEventListener("keydown", (e) => {
      confirmTask(e, task, currentLi, input, task.dueDate, tasks);
    });
  }
}

function removeTask(id) {
  console.log(id);
  currentList.list.splice(Number(id), 1);
  console.log(currentList.list);
  sortTasksId();
  displayContent(currentList);
}

function displayContent(currentList) {
  const list = document.createElement("ul");
  list.id = "tasks";
  doms.todo.textContent = "";

  let i = 0;

  currentList.list.forEach((obj) => {
    const li = document.createElement("li");
    li.classList.add("task-list");
    const title = document.createElement("span");
    title.classList.add("task-title");
    title.textContent = obj.title;
    let id = i;
    title.id = id;
    const dueDate = document.createElement("span");
    dueDate.textContent = obj.dueDate
    dueDate.classList.add('due-date')
    const removeTask_btn = document.createElement("button");
    removeTask_btn.classList.add("remove-btn");
    removeTask_btn.textContent = "X";
    removeTask_btn.addEventListener("click", () => {
      removeTask(id);
    });
    li.appendChild(title);
    li.appendChild(dueDate);
    list.appendChild(li);
    i++;
    title.addEventListener(
      "click",
      (e) => {
        newTask(list, obj, e);
      },
      { once: true },
    );

    li.appendChild(removeTask_btn);
  });
  doms.todo.appendChild(list);
  addTask();
  doms.content.appendChild(doms.todo);
}

function sortTasksId() {
  const tasks = document.querySelectorAll("#tasks");
  tasks.forEach((task, i) => {
    task.id = i;
  });
}

export {
  newList,
  newListForm,
  displayLists,
  lists,
  displayContent,
  currentList,
};
