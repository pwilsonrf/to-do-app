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
    for (let key in attributes){
        newField.setAttribute(key, attributes[key]);
        if(attributes[key] === 'submit'){
            newField.value = text;
        }
    }

    if(text){newField.innerText = text;}
    parent.appendChild(newField);

    if(fieldType === 'select'){
        ['Normal', 'High', 'Low'].forEach(each => {
            let opt = document.createElement('option');
            opt.innerText = each;
            newField.appendChild(opt);})
    }

    return newField;

}

export function grabFormData(){
    const taskObject = {
        title:  document.getElementById('taskTitle').value,
        project: document.getElementById('taskProject').value,
        dueDate: document.getElementById('taskDueDate').value,
        priority: document.getElementById('taskPriority').value,
        description: document.getElementById('taskDescription').value,
    }
    console.log(taskObject);
    return taskObject;
}

export function saveToLocalStorage(obj){
    localStorage.setItem(obj.uniqueID, JSON.stringify(obj))
}

export function createTask(obj){
    this.title = obj.title;
    this.description = obj.description;
    this.assignedProject = obj.project;
    this.dueDate = obj.dueDate;
    this.priority = obj.priority;
    // this.dateCreated = dateCreated;
    this.uniqueID = uuidv4();
    // this.status = 'Not Started';
    // this.dateModified = "";
    // this.childrenID = {};
}



