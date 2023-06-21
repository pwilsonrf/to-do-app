import './styles.css';
import {createElement, createTask, saveFormData, grabFormData, saveToLocalStorage} from './generalFunctions.js';
// import {appendAChild } from './generalFunctions.js';
import {newTaskDialog} from './newTaskDialog.js';

const body = document.querySelector('#main-container');
const newTaskButton = createElement('button', 'newTask-button', '', 'New Task');

console.log(newTaskButton);
body.appendChild(newTaskButton);
newTaskDialog()
newTaskButton.addEventListener("click", ()=> {
    const form = document.getElementById("formContainer");
    // console.log(form);
    // form.classList.add('showContainer');
    form.style.visibility = "visible";
    form.style.opacity = 1;
});

document.querySelector('#taskSaveButton').addEventListener('click', ()=>{
    let formObj = grabFormData();
    let taskObj = new createTask(formObj);
    saveToLocalStorage(taskObj);
    console.log(formObj);
});
