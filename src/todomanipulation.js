import { Item,TodoList } from "./todotemplate.js";

const defaultList = new TodoList("defaultList","this is a default list")
const lists = [defaultList]

const doms = (function () {
  const sidebar = document.querySelector("#sidebar")
  const addlistform = document.querySelector("#addlist")
  const bgdisable = document.querySelector("#bg-disable")
  const newlist_btn = document.querySelector("#newlist")
  const close_btn = document.querySelector("#close-btn")
  const content = document.querySelector("#content")
  const confirm_btn = document.querySelector("#confirm-btn")
  const lists = document.querySelector("#lists")
  return {sidebar,addlistform,bgdisable,newlist_btn,close_btn,confirm_btn,lists}
})()

function newList(title,description) {
  const list = new TodoList(title,description)
  lists.push(list)
}

function displayLists(lists){
  doms.lists.textContent=''
  const ul = document.createElement("ul")
  lists.forEach( list => {
    const li = document.createElement("li")
    li.textContent = list.title
    ul.appendChild(li)
  });
  doms.lists.appendChild(ul)
}

function confirmBtn() {
  event.preventDefault()
  const titleField = document.querySelector("#titleField")
  const descriptionField = document.querySelector("#descriptionField")

  newList(titleField.value,descriptionField.value)
  displayLists(lists)
  titleField.value = ""
  descriptionField.value = ""
  closeBtn()
}

function closeBtn() {
  event.preventDefault()
  doms.addlistform.style.display="none"
  doms.bgdisable.style.display="none"
}

function newListForm() {
  doms.newlist_btn.addEventListener("click",()=>{
    doms.addlistform.style.display="block"
    doms.bgdisable.style.display="block"
    doms.close_btn.addEventListener("click",closeBtn)
    doms.confirm_btn.addEventListener("click",confirmBtn)
  })
}

export {newList, newListForm,displayLists,lists}
