class Item {
  constructor(title,description,dueDate,priority){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}
class TodoList {
  constructor(title,description){
    this.title = title
    this.list = []
    this.description = description
  }

  addItem = (title,description,dueDate,priority)=>{
    const item = new Item(title,description,dueDate,priority);
    this.list.push(item);
  }
  deleteItem = (id)=>{
    this.list.splice(Number(this.list.findIndex(id)),0)
  }
}


export {Item,TodoList}
