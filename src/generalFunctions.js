
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


export function addFormField(fieldType, attributes, parent){
    const newForm = createElement(fieldType);

    for (key in attributes){
        newForm.setAttribute(key, attributes[key]);
    }

    parent.appendChild(newField);
    

