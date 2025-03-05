import { Item,TodoList } from "./todotemplate.js";

const defaultList = new TodoList("defaultList","this is a default list")
const lists = [defaultList]
defaultList.addItem("example item","example description example description", "date", "2",0)
defaultList.addItem("example item2","desc desc","date2", "4",1)


let currentList = lists[0]
console.log(currentList)

const doms = (function () {
  const sidebar = document.querySelector("#sidebar")
  const addlistform = document.querySelector("#addlist")
  const bgdisable = document.querySelector("#bg-disable")
  const newlist_btn = document.querySelector("#newlist")
  const close_btn = document.querySelector("#close-btn")
  const content = document.querySelector("#content")
  const confirm_btn = document.querySelector("#confirm-btn")
  const lists = document.querySelector("#lists")
  const todo = document.querySelector("#todolists")
  return {sidebar,content,addlistform,bgdisable,newlist_btn,close_btn,confirm_btn,lists,todo}
})()

function newList(title,description) {
  const list = new TodoList(title,description)
  lists.push(list)
}

function displayLists(lists){
  doms.lists.textContent=''
  let i = 0
  const ul = document.createElement("ul")
  lists.forEach( list => {
    const li = document.createElement("li")
    li.textContent = list.title
    li.id = i
    ul.appendChild(li)
    i++
  });
  doms.lists.appendChild(ul)
  
  doms.lists.addEventListener("click", (e)=>{
    currentList = lists[Number(e.target.id)]
    displayContent(currentList)
  })
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


function confirmTask(e,task,currentLi,input,tasks) {
  if (event.key == 'Enter'){
    task.title = input.value
    currentLi.textContent = input.value
    console.log(task.title)
    currentLi.addEventListener("click", (e)=>{newTask("hh",tasks,task,e)}, {once: true})
  }

  if (event.key == 'Escape') {
    if(task.title !== undefined){
      currentLi.textContent = task.title
      console.log("task.title esc :"+task.title)
      currentLi.addEventListener("click", (e)=>{newTask("hh",tasks,task,e)}, {once: true})
    }
    else {
      currentLi.remove()
    }
 }
}

function addTask() {
  const addItem_btn = document.createElement("button")
  addItem_btn.textContent = "Add task"
  addItem_btn.classList.add("btn-new")
  addItem_btn.id = "new-task"
  const tasks = document.querySelector("#tasks")
  doms.todo.appendChild(addItem_btn)
  addItem_btn.addEventListener("click", (e)=>{newTask("",tasks,undefined,e)})
}

function newTask(oldTask,tasks,task,ev) {
  if(oldTask==""){
    const newli = document.createElement("li")
    const input = document.createElement("input")
    input.setAttribute("type", "text")
    newli.id = currentList.length
    newli.appendChild(input)
    tasks.appendChild(newli)
    let id = currentList.length
    currentList.addItem(undefined,undefined,undefined,undefined, id)
    currentList.list.map((item) => {
      if (item.id == id){
        task = item
      }
    })
    console.log(task)
    input.addEventListener("keydown",(e)=>{ confirmTask(e,task,newli,input,tasks) })
  }
  else{
    let id = ev.target.id
    const currentLi = document.querySelector(`#todolists ul [id='${id}']`)

    const input = document.createElement("input")
    input.setAttribute("type", "text")
    input.value = currentLi.textContent
    currentLi.textContent = ''
    currentLi.appendChild(input)
    input.addEventListener("keydown", (e)=>{ confirmTask(e,task,currentLi,input,tasks)})
  }
}

function displayContent(currentList) {
  const list = document.createElement("ul")
  list.id = "tasks"
  doms.todo.textContent = ''
  let i = 0
  
  currentList.list.forEach( obj => {
    const li = document.createElement("li")
    li.textContent = obj.title
    li.id = i
    list.appendChild(li)
    i++
    li.addEventListener("click", (e)=>{newTask("hh",list,obj,e)}, {once : true})
  })
  doms.todo.appendChild(list)
  addTask()
  doms.content.appendChild(doms.todo)
}

export {newList, newListForm,displayLists,lists,displayContent,currentList}
