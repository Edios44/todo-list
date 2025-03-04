import { Item,TodoList } from "./todotemplate.js";
import { format, compareAsc } from "date-fns";
import "./style.css"
import { newListForm,displayLists,lists } from "./todomanipulation.js"


displayLists(lists)
newListForm()

