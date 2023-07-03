import { v4 as uuidv4} from 'uuid';
import { compareAsc, format, parseISO, isSameWeek} from 'date-fns';
import { tasksArray } from '.';
/*
Create element and append to DOM
Args:
- element: New element type to create (e.g. 'div')
- text: Inner text for element
- parent: Parent container to append new element to.
- className: New element class name
- id: New element id
- source: Add source attribute for anchor, if applicable
*/
export function createElement(element, className = "#", id = "#", text = "", parent, source, content) {
    const newElement = document.createElement(element);
    newElement.innerText = text;
    newElement.className = className;
    newElement.id = id;
    newElement.content = content;

    if (parent){
        parent.appendChild(newElement);
    }

    if(element === 'a' && source){
        newElement.href = source;
    }

    if(element === 'img' && source){
        newElement.src = source;
    }
    return newElement;
}

/*
Append a child to its parent
Args:
    - Parent: Parent element whom 'child' will be appended to
    - child: Child element to be appended
*/
export function appendAChild(parent, child) {
    parent.appendChild(child);
}
export function createTextSection(headingText, headingClass, headingId, paragraphText, paragraphClass, paragraphId, container){
    const heading = createElement('h3', headingClass, headingId, headingText);
    const p = createElement('p', paragraphClass, paragraphId, paragraphText);
    appendAChild(container, heading);
    appendAChild(container, p);

    return container
}

/*
Render content in a container
Args:
    -page: Content to be rendered
    -container: Container whom content will be rendered to
*/
export function renderContent(page, container){
    const newPage = page();
    const mainContainer = container;
    mainContainer.innerHTML = '';
    mainContainer.appendChild(newPage);
}

export function addFormField(fieldType, attributes, text, parent){
    const newField = createElement(fieldType);
    let optionsPresent;
    for (let key in attributes){
        newField.setAttribute(key, attributes[key]);
        if(attributes[key] === 'submit'){
            newField.value = text;
        }
    }

    if(newField.id === 'taskPriority'){
        ['Normal', 'High', 'Low'].forEach(each => {
            let opt = createElement('div', `priority-button ${each}-button`);
            if(each == 'Normal'){
                opt.classList.add('priority-active');
            }
            opt.innerText = each;
            newField.appendChild(opt);
        });
    }

    if(newField.id === 'taskProject'){
        ['Personal', 'Work', 'Home'].forEach(each => {
            let opt = createElement('div', `project-button ${each}-button`, );
            if(each == 'Personal'){
                opt.classList.add('project-active');
            }
            opt.innerText = each;
            newField.appendChild(opt);
        });
    }
    
    if(text){newField.innerText = text;}
    parent.appendChild(newField);

   

    return newField;

}

export function grabFormData(){
    const taskObject = {
        title:  document.getElementById('taskTitle').value,
        project: document.getElementsByClassName('project-active')[0].innerText,
        dueDate: document.getElementById('taskDueDate').value,
        priority: document.getElementsByClassName('priority-active')[0].innerText,
        description: document.getElementById('taskDescription').value,
    }
    console.log(taskObject);
    return taskObject
}

/*
Saves new task object to current array of tasks on LocalStorage and renders tasks to task container
Args: 
    -Newly created task object
*/
export function saveToLocalStorage(obj){
    const tasksArray = JSON.parse(localStorage.getItem("tasksArray"));
    obj.counter = tasksArray.length + 1;
    tasksArray.push([obj.counter, obj]);
    console.log(tasksArray);
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
    // renderTasks(tasksArray)
}

// export function renderTasks(objArray){
//     const container = document.querySelector("#personal-task-container");
//     container.innerHTML = '';
//     objArray.forEach(task => renderTaskOnDatabase(task[1], container));
// }


    
/*
Create a Task Object to be used for rendering and adding to database
Args:
    - Data in form of an object grabbed from Form Submission
*/
export function createTask(obj){
    this.title = obj.title;
    this.description = obj.description;
    this.assignedProject = obj.project;
    this.dueDate = obj.dueDate;
    this.priority = obj.priority;
    this.uniqueID = uuidv4();
}

/*
Render task on a container
Args:
    - Task's object
    - Container task is to be added
*/
export function renderTaskOnDatabase(obj, container){
    const renderContainer = createElement('div', 'newTask');
    const renderChild1 = createElement('div', 'renderChild', 'renderChild1', '', renderContainer);
    const renderChild2 = createElement('div', 'renderChild', 'renderChild2', '', renderContainer);
    const renderChild3 = createElement('div', 'renderChild', 'renderChild3', '', renderContainer);
    const renderChild1Left = createElement('div', '', 'renderChild1Left','',renderChild1);
    const renderChild1Right = createElement('div', '', 'renderChild1Right','',renderChild1);
    const renderChild3Left = createElement('div', '', 'renderChild3Left','',renderChild3);
    const renderChild3Right = createElement('div', '', 'renderChild3Right','',renderChild3);
    
    createElement('h2', "taskTitle task-item", '', `${obj.title}`, renderChild2);
    if (obj.description){
        const descriptionCont = createElement('div', 'taskDescriptionContainer', '', '', renderChild3Left);
        createElement('p', "taskDescription task-item", '', `${obj.description}`, descriptionCont);
    }

    if (obj.dueDate){
        // let dueDate = obj.dueDate.split('-').toS;
        let date = format( parseISO(obj.dueDate), 'EEEE');
        const dueDateCont = createElement('div', 'taskDueDateContainer', '', '', renderChild1Right);
        createElement('p', "taskDueDate task-item", '', `${date}`, dueDateCont);

    }
    if (obj.assignedProject){
        const projectCont = createElement('div', `taskProjectContainer ${obj.assignedProject}-button-active`, '', '', renderChild1Left);
        createElement('p', "taskProject task-item", '', `${obj.assignedProject}`, projectCont);
        console.log(obj.project);
    }
    
    if (obj.priority){
        const priorityCont = createElement('div', `taskPriorityContainer ${obj.priority}-button-active`, '', '', renderChild1Left);
        createElement('p', "taskPriority task-item", '', `${obj.priority}`, priorityCont);
        console.log(obj.priority);
    }

    const img = createElement('img', "newTaskIcon", "complete-task-before", '', renderChild3Right, '../src/img/complete-task-before.svg');
    img.addEventListener("click", (e) => {
        if(img.id === 'complete-task-before'){
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
    appendAChild(container, renderContainer);



    // renderContainer.addEventListener("click", (e) => {
    //     console.log(e.target);
    //   });
    // renderTasks()
}

// export function editTask(obj){
//     const form = newTaskDialog();
//     console.log('does this')
//     form.getElementById('taskTitle').value = obj.title;
//     return form
// }


export function changePriority(obj, newPriority){
    obj.priority = newPriority;
}

export function changeProject(obj, newProject){
    obj.assignedProject = newProject;
}

export function changeDueDate(obj, newDueDate){
    obj.dueDate = newDueDate;
}

export function changeTitle(obj, newTitle){
    obj.title = newTitle;
}

export function changeDescription(obj, newDescription){
    obj.description = newDescription;
}



