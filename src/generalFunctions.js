import { v4 as uuidv4} from 'uuid';
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
    return taskObject;
}

export function saveToLocalStorage(obj, container){
    localStorage.setItem(obj.uniqueID, JSON.stringify(obj));
    renderTaskOnDatabase(obj, container);
}
    
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
        const descriptionCont = createElement('div', 'taskDescriptionContainer', '', '', renderChild3);
        createElement('p', "taskDescription task-item", '', `${obj.description}`, descriptionCont);
    }

    if (obj.dueDate){
        const dueDateCont = createElement('div', 'taskDueDateContainer', '', '', renderChild1Right);
        createElement('p', "taskDueDate task-item", '', `${obj.dueDate}`, dueDateCont);

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
    appendAChild(container, renderContainer);
}



