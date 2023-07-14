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
   console.log(formContainer)
   formContainer.style.visibility = "visible";
   formContainer.style.opacity = 1;
   console.log(document.getElementById("formContainer"));
   let objNum = e.target.id.match(/\d+$/)[0] - 1;
   objNum = objNum >= 0 ? objNum : 0;
   console.log(objNum);
   const obj = JSON.parse(localStorage.getItem('tasksArray'))[objNum];
   console.log(obj);
   editTask(obj[1]);

   document.getElementById('NewTaskHeading').innerText = 'Edit task';
   document.getElementById('taskSaveButton').value = 'Save task';

   document.getElementById('taskDueDate').value = obj[1].dueDate;
   document.getElementById('taskProject').value = obj[1].assignedProject;

   //Change project active
   document.querySelector('.project-active').classList.remove('project-active');
   document.querySelector(`.${obj[1].assignedProject}-button`).classList.add('project-active');

   //Change priority active
   document.querySelector('.priority-active').classList.remove('priority-active');
   document.querySelector(`.${obj[1].priority}-button`).classList.add('priority-active');

   document.getElementById('taskDescription').value = obj[1].description;
   document.getElementById('taskTitle').value = obj[1].title;

   //Overwrite the current task
   document.getElementById('newTaskForm').removeEventListener('submit', saveTask);
   document.getElementById('newTaskForm').addEventListener('submit', );

   

   // Switch the submit button on the form to have a different title and to overwrite the current task


}));

function modifyTask(e) {
   e.preventDefault();
   console.log('run edit form')
   const taskObj = createTask();
   JSON.parse(localStorage.getItem('tasksArray'))[objNum][1] = taskObj;
   localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
   clearAllTasks();
   renderTasks();
}

function saveTask(e) {
e.preventDefault();
  const form = document.getElementById("newTaskForm");
  const formContainer = document.getElementById("formContainer");
  let isFormValid = form.checkValidity();
  if (!isFormValid) {
    form.reportValidity();
  } else {
    const taskObj = createTask();
    console.log(`Object has been created!, ${JSON.stringify(taskObj)}`);
    saveToLocalStorage(taskObj);
    clearAllTasks();
    renderTasks();
  }

  formContainer.style.visibility = 'hidden';
  formContainer.style.transition = 'all 0s';
  form.reset();
};
//Save New Task
document.getElementById('newTaskForm').removeEventListener('submit', modifyTask);
document.getElementById('newTaskForm').addEventListener("submit", saveTask);

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




