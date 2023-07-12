import "./styles.css";
import {
   createElement,
   createTask,
   editTask,
   grabFormData,
   saveToLocalStorage
} from "./generalFunctions.js";
import { newTaskDialog } from "./newTaskDialog.js";
import { renderTaskContainer } from "./dashboard";
import { clearAllTasks, renderTasks } from "./renderTasks";


//Initial Set Up
export const tasksArray = []; //Array of tasks
const ls = require('local-storage');
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

//Test
const editButtons = document.querySelectorAll('.editTask-button');
editButtons.forEach(each => each.addEventListener("click", (e) => {
   const form = document.getElementById("newTaskForm");
   const formContainer = document.getElementById("formContainer");
   formContainer.style.visibility = "visible";
   formContainer.style.opacity = 1;

   const objNum = e.target.id.match(/\d+$/)[0];
   const obj = ls.get('tasksArray')[objNum];
   // editTask(obj);
   console.log(obj[1])

   document.getElementById('taskDueDate').value = obj[1].dueDate;
        document.getElementById('taskProject').value = obj[1].assignedProject;
        document.getElementById('taskPriority').value = obj[1].priority;
        document.getElementById('taskDescription').value = obj[1].description;
      document.getElementById('taskTitle').value = obj[1].title;
   
   
   
   
}));


//Save New Task
document.getElementById('newTaskForm').addEventListener("submit", (e) => {
  const form = document.getElementById("newTaskForm");
  const formContainer = document.getElementById("formContainer");
  let isFormValid = form.checkValidity();
  if (!isFormValid) {
    form.reportValidity();
  } else {
    const taskObj = new createTask();
    saveToLocalStorage(taskObj);
    clearAllTasks();
    renderTasks();
  }
  e.preventDefault();
  formContainer.style.visibility = 'hidden';
  formContainer.style.transition = 'all 0s';
  form.reset();
});

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




