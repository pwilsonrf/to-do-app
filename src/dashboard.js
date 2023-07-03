import { appendAChild, createElement } from "./generalFunctions"

export function renderTaskContainer(){
    //Add Task Project Containers
    appendAChild(document.querySelector('.main-column1'), createElement('div', 'task-container', 'work-tasks-container'))
    appendAChild(document.querySelector('.main-column2'), createElement('div', 'task-container', 'personal-tasks-container'))
    appendAChild(document.querySelector('.main-column3'), createElement('div', 'task-container', 'home-tasks-container'))
    appendAChild(document.querySelector('.main-column4'), createElement('div', 'task-container', 'reminders-tasks-container'))
}

