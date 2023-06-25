import "./styles.css";
import {
   createElement,
   createTask,
   saveFormData,
   grabFormData,
   saveToLocalStorage,
} from "./generalFunctions.js";
// import {appendAChild } from './generalFunctions.js';
import { newTaskDialog } from "./newTaskDialog.js";

const body = document.querySelector("#main-container");
const newTaskButton = createElement("button", "newTask-button", "", "New Task");

// console.log(newTaskButton);
body.appendChild(newTaskButton);
newTaskDialog();
newTaskButton.addEventListener("click", () => {
   const form = document.getElementById("formContainer");
   // console.log(form);
   // form.classList.add('showContainer');
   form.style.visibility = "visible";
   form.style.opacity = 1;
});

document.querySelector("#taskSaveButton").addEventListener("click", (e) => {
   const container = document.querySelector("#main-container");
   let formObj = grabFormData();
   let taskObj = new createTask(formObj);
   saveToLocalStorage(taskObj, container);
   console.log(taskObj);
   e.preventDefault();
});

//Add Priority Select Behavior
const allButtons = [...document.querySelectorAll("div.priority-button")];
console.log(allButtons);
allButtons.forEach((element) => {
   element.addEventListener("click", (e) => {
      allButtons.forEach((element) => {
         element.classList.remove("button-active");
      });
      e.target.classList.add("button-active");
   });
});

//Add Priority Select Behavior
const allProjects = [...document.querySelectorAll("div.project-button")];
console.log(allProjects);
allProjects.forEach((element) => {
   element.addEventListener("click", (e) => {
      allProjects.forEach((element) => {
         element.classList.remove("project-active");
      });
      e.target.classList.add("project-active");
   });
});
