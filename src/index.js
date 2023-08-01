import "./styles.css";
import {
   addEventListenerToEditButtons,
   createElement,
   createTask,
   editTask,
   grabFormData,
   saveToLocalStorage,
   updateToLocalStorage
} from "./generalFunctions.js";
import { newTaskDialog } from "./newTaskDialog.js";
import { renderTaskContainer } from "./dashboard";
import { clearAllTasks, renderTasks } from "./renderTasks";

//Initial Set Up
export const tasksArray = []; //Array of tasks
renderTaskContainer();
renderTasks();
newTaskDialog();

//Main header 
const header = document.querySelector(".header");
const newTaskButton = createElement("button", "newTask-button", "", "New Task");
header.appendChild(newTaskButton);
newTaskButton.addEventListener("click", () => {
   const form = document.getElementById("formContainer");
   form.style.visibility = "visible";
   form.style.opacity = 1;
});

//Add event listener to all edit buttons (at startup)
addEventListenerToEditButtons();

/*
Grab form data and update task object to local storage when an existing task is being edited
Args:
   - event target
   - task number in TasksArray (in Local Storage)
*/
export function modifyTask(e, objNum) {
   if (objNum == -1){
      return
   }
   e.preventDefault();
   const form = document.getElementById("newTaskForm");
   const formContainer = document.getElementById("formContainer");
   const taskObj = createTask();
   updateToLocalStorage(taskObj, objNum);
   clearAllTasks();
   renderTasks();
   addEventListenerToEditButtons();
   formContainer.style.visibility = 'hidden';
   formContainer.style.transition = 'all 0s';
   form.reset();
}
/*
Grab form data and create task to local storage when a new task is being created
Args:
   - event target
*/
export function saveTask(e) {
   e.preventDefault();
   const form = document.getElementById("newTaskForm");
   const formContainer = document.getElementById("formContainer");
   const taskObj = createTask();
   saveToLocalStorage(taskObj)
   clearAllTasks();
   renderTasks();
   addEventListenerToEditButtons();
   formContainer.style.visibility = 'hidden';
   formContainer.style.transition = 'all 0s';
   form.reset();
};

//Add Priority Select Behavior
const allButtons = [...document.querySelectorAll("div.priority-button")];
allButtons.forEach((element) => {
   element.addEventListener("click", (e) => {
      allButtons.forEach((element) => {
         element.classList.remove("priority-active");
      });
      e.target.classList.add("priority-active");
   });
});

//Add Project Select Behavior
const allProjects = [...document.querySelectorAll("div.project-button")];
allProjects.forEach((element) => {
   element.addEventListener("click", (e) => {
      allProjects.forEach((element) => {
         element.classList.remove("project-active");
      });
      e.target.classList.add("project-active");
   });
});




