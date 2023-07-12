import { appendAChild, createElement } from "./generalFunctions"

/*
Render all tasks on container
*/
export function renderTaskContainer(){
    appendAChild(document.querySelector('#main-container'), createElement('div', 'main-column1 main-column', 'personal-tasks'))
    appendAChild(document.querySelector('#main-container'), createElement('div', 'main-column2 main-column', 'work-tasks'))
    appendAChild(document.querySelector('#main-container'), createElement('div', 'main-column3 main-column', 'home-tasks'))
    appendAChild(document.querySelector('#main-container'), createElement('div', 'main-column4 main-column', 'reminders-tasks'))

    //Add Task Project Container Headers
    appendAChild(document.querySelector('.main-column1'), createElement('div', 'personal-tasks-header task-container-header', '', 'Personal'))
    appendAChild(document.querySelector('.main-column2'), createElement('div', 'work-tasks-header task-container-header', '', 'Work'))
    appendAChild(document.querySelector('.main-column3'), createElement('div', 'home-tasks-header task-container-header', '', 'Home'))
    appendAChild(document.querySelector('.main-column4'), createElement('div', 'reminders-tasks-header task-container-header', '', 'Reminders'))

    //Add Task Project Containers
    appendAChild(document.querySelector('.main-column1'), createElement('div', 'task-container', 'personal-tasks-container'))
    appendAChild(document.querySelector('.main-column2'), createElement('div', 'task-container', 'work-tasks-container'))
    appendAChild(document.querySelector('.main-column3'), createElement('div', 'task-container', 'home-tasks-container'))
    appendAChild(document.querySelector('.main-column4'), createElement('div', 'task-container', 'reminders-tasks-container'))

    //Add New Task Buttons at the end of each column
    for (let i = 1; i<=4; i++){
        let newTaskButton = createElement("button", "newTask-button", "", "");
        createElement('img', "addNewTask-icon", '', '', newTaskButton, '../src/img/add.svg')
        newTaskButton.addEventListener("click", () => {
            const form = document.getElementById("formContainer");
            form.style.visibility = "visible";
            form.style.opacity = 1;
         })
         appendAChild(document.querySelector(`.main-column${i}`), newTaskButton);
    }
}





