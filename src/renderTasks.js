import { renderTaskOnDatabase } from './generalFunctions';

export function renderTasks(){
    var ls = require('local-storage');
    const tasksArray = ls.get('tasksArray');
    tasksArray.forEach(task =>{
        if(task[1].assignedProject === 'Personal'){
            let container = document.querySelector('#personal-tasks-container');
            renderTaskOnDatabase(task[1], container)
        } else if(task[1].assignedProject === 'Work'){
            let container = document.querySelector('#work-tasks-container');
            renderTaskOnDatabase(task[1], container)
        } else if(task[1].assignedProject === 'Home'){
            let container = document.querySelector('#home-tasks-container');
            renderTaskOnDatabase(task[1], container)
        } else if(task[1].assignedProject === 'Reminders'){
            let container = document.querySelector('#reminders-tasks-container');
            renderTaskOnDatabase(task[1], container)
        }
    })
}


export function clearAllTasks(){
    const container1 = document.querySelector("#personal-task-container");
    container.innerHTML = '';

    const container2 = document.querySelector("#home-task-container");
    container.innerHTML = '';

    const container3 = document.querySelector("#work-task-container");
    container.innerHTML = '';

    const container4 = document.querySelector("#reminders-task-container");
    container.innerHTML = '';
}