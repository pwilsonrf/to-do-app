import { renderTaskOnDatabase, createElement } from './generalFunctions';

/*
Render tasks on container of tasks
*/
export function renderTasks() {
    var ls = require('local-storage');
    const tasksArray = ls.get('tasksArray');
    tasksArray.forEach(task =>{
        if (task[1].assignedProject === 'Personal') {
            let container = document.querySelector('#personal-tasks-container');
            renderTaskOnDatabase(task[1], task[0], container)
        } else if (task[1].assignedProject === 'Work') {
            let container = document.querySelector('#work-tasks-container');
            renderTaskOnDatabase(task[1], task[0], container)
        } else if (task[1].assignedProject === 'Home') {
            let container = document.querySelector('#home-tasks-container');
            renderTaskOnDatabase(task[1], task[0], container)
        } else if (task[1].assignedProject === 'Reminders') {
            let container = document.querySelector('#reminders-tasks-container');
            renderTaskOnDatabase(task[1], task[0], container)
        }
    })
}

/*
Clear all tasks from container of tasks
*/
export function clearAllTasks() {
    document.querySelector("#personal-task-container").innerHTML = '';
    document.querySelector("#home-task-container").innerHTML = '';
    document.querySelector("#work-task-container").innerHTML = '';
    document.querySelector("#reminders-task-container").innerHTML = '';
}