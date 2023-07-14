import { v4 as uuidv4} from 'uuid';
import { newTaskDialog } from './newTaskDialog';
import { 
    compareAsc,
    format,
    parseISO,
    isSameWeek
} from 'date-fns';

/*
Create element and append to DOM
Args:
    - element(string): New element type to create (e.g. 'div')
    - text(string): Inner text for element
    - parent(HTMLElement): Parent container to append new element to.
    - className(string): New element class name
    - id(string): New element id
    - source(string): Add source attribute for anchor, if applicable
*/
export function createElement(element, className = "#", id = "#", text = "", parent, source, content) {
    const newElement = document.createElement(element);
    newElement.innerText = text;
    newElement.className = className;
    newElement.id = id;
    newElement.content = content;

    if (parent) {
        parent.appendChild(newElement);
    }

    if (element === 'a' && source) {
        newElement.href = source;
    }

    if (element === 'img' && source) {
        newElement.src = source;
    }
    return newElement;
}

/*
Append a child to its parent
Args:
    - parent(HTMLElement): Parent element whom 'child' will be appended to
    - child(HTMLElement): Child element to be appended
*/
export function appendAChild(parent, child) {
    parent.appendChild(child);
}

/*
Add fields to new task form
Args:
    -fieldType(string): type of field
    -attributes(obj): attributes for such field
    -text(string): any inner text
    -parent(HTMLElement): parent container to attach field to
*/
export function addFormField(fieldType, attributes, text, parent) {
    const newField = createElement(fieldType);
    for (let key in attributes) {
        newField.setAttribute(key, attributes[key]);
        if (attributes[key] === 'submit') {
            newField.value = text;
        }
    }

    if (newField.id === 'taskPriority') {
        ['Normal', 'High', 'Low'].forEach(each => {
            let opt = createElement('div', `priority-button ${each}-button`);
            if (each == 'Normal') {
                opt.classList.add('priority-active');
            }
            opt.innerText = each;
            newField.appendChild(opt);
        });
    }

    if (newField.id === 'taskProject') {
        ['Personal', 'Work', 'Home', "Reminders"].forEach(each => {
            let opt = createElement('div', `project-button ${each}-button`, );
            if (each == 'Personal') {
                opt.classList.add('project-active');
            }
            opt.innerText = each;
            newField.appendChild(opt);
        });
    }

    if (text) {
        newField.innerText = text;
    }
    parent.appendChild(newField);
    return newField;
}

/*
Saves new task object to current array of tasks on LocalStorage and renders tasks to task container
Args: 
    -obj(obj): Newly created task object
*/
export function saveToLocalStorage(obj) {
    const tasksArray = JSON.parse(localStorage.getItem("tasksArray")) ?? [];
    obj.counter = tasksArray.length + 1;
    tasksArray.push([obj.counter, obj]);
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}
    
/*
Create a Task Object to be used for rendering and adding to database
*/
export function createTask() {
    const obj = {};
    obj.title = document.getElementById('taskTitle').value;
    obj.description = document.getElementById('taskDescription').value;
    obj.assignedProject = document.getElementsByClassName('project-active')[0].innerText;
    obj.dueDate = document.getElementById('taskDueDate').value;
    obj.priority = document.getElementsByClassName('priority-active')[0].innerText;
    obj.uniqueID = uuidv4();
    return obj;
}

/*
Render task on a container
Args:
    - obj(obj): Task's object
    - container(HTMLElement): Container task is to be added
*/
export function renderTaskOnDatabase(obj, objNum, container) {
    const renderContainer = createElement('div', 'newTask');
    const renderChild1 = createElement('div', 'renderChild', 'renderChild1', '', renderContainer);
    const renderChild2 = createElement('div', 'renderChild', 'renderChild2', '', renderContainer);
    const renderChild3 = createElement('div', 'renderChild', 'renderChild3', '', renderContainer);
    const renderChild1Left = createElement('div', '', 'renderChild1Left','',renderChild1);
    const renderChild1Right = createElement('div', '', 'renderChild1Right','',renderChild1);
    const renderChild3Left = createElement('div', '', 'renderChild3Left','',renderChild3);
    const renderChild3Right = createElement('div', '', 'renderChild3Right','',renderChild3);
    
    createElement('h2', "taskTitle task-item", '', `${obj.title}`, renderChild2);
    if (obj.description) {
        const descriptionCont = createElement('div', 'taskDescriptionContainer', '', '', renderChild3Left);
        createElement('p', "taskDescription task-item", '', `${obj.description}`, descriptionCont);
    }

    if (obj.dueDate) {
        let date = format(parseISO(obj.dueDate), 'EEEE');
        const dueDateCont = createElement('div', 'taskDueDateContainer', '', '', renderChild1Right);
        createElement('p', "taskDueDate task-item", '', `${date}`, dueDateCont);

    }
    if (obj.assignedProject) {
        const projectCont = createElement('div', `taskProjectContainer ${obj.assignedProject}-button-active`, '', '', renderChild1Left);
        createElement('p', "taskProject task-item", '', `${obj.assignedProject}`, projectCont);
    }
    
    if (obj.priority) {
        const priorityCont = createElement('div', `taskPriorityContainer ${obj.priority}-button-active`, '', '', renderChild1Left);
        createElement('p', "taskPriority task-item", '', `${obj.priority}`, priorityCont);
    }

    const img = createElement('img', "newTaskIcon", "complete-task-before", '', renderChild3Right, '../src/img/complete-task-before.svg');
    img.addEventListener("click", (e) => {
        if (img.id === 'complete-task-before') {
            console.log('this works')
            img.src = '../src/img/complete-task-after.svg';
            img.removeAttribute('id');
            img.setAttribute("id", 'complete-task-after');
        } else {
            img.setAttribute("src", '../src/img/complete-task-before.svg');
            img.removeAttribute('id');
            img.setAttribute("id", 'complete-task-before');
        }
    });
    const editTaskButton = createElement("button", "editTask-button", `editButton${objNum}`, "Edit Task");
    renderContainer.appendChild(editTaskButton);
    appendAChild(container, renderContainer);
}

export function editTask(obj) {
    // const form = document.getElementById("newTaskForm");
    // const formContainer = document.getElementById("formContainer");

    const form = document.getElementById("newTaskForm");
    const formContainer = document.getElementById("formContainer");
    formContainer.style.visibility = "visible";
    formContainer.style.opacity = 1;
    
        
        document.getElementById('taskDueDate').value = obj.dueDate;
        document.getElementById('taskProject').value = obj.assignedProject;
        document.getElementById('taskPriority').value = obj.priority;
        document.getElementById('taskDescription').value = obj.description;
        document.getElementById('taskTitle').value = obj.title;

        // formContainer.style.visibility = 'visible';
        // formContainer.style.transition = 'all 0s';
        
    // }
    // form.preventDefault();
    // form.reset();
    
    return form;
}

// export function changePriority(obj, newPriority) {
//     obj.priority = newPriority;
// }

// export function changeProject(obj, newProject) {
//     obj.assignedProject = newProject;
// }

// export function changeDueDate(obj, newDueDate) {
//     obj.dueDate = newDueDate;
// }

// export function changeTitle(obj, newTitle) {
//     obj.title = newTitle;
// }

// export function changeDescription(obj, newDescription) {
//     obj.description = newDescription;
// }



