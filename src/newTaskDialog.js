import { appendAChild, createElement } from "./generalFunctions";

export function newTaskDialog(){
    const body = document.querySelector('body');
    //Form Container
    const formContainer = createElement('div','formContainer', 'formContainer');

    //Create newTaskForm container
    const newTaskForm = document.createElement('newTaskForm')
    newTaskForm.setAttribute("action", "");
    newTaskForm.setAttribute("id", "newTaskForm");
    const newTaskHeader = createElement('h2', 'heading2', 'NewTaskHeading', 'New Task');
    appendAChild(newTaskForm, newTaskHeader);

    // //Create label for Title
    // const titleLabel = createElement('label');
    // titleLabel.setAttribute("for", "title");
    // titleLabel.innerText = "Title";
    // appendAChild(newTaskForm, titleLabel);

    //Create an input element for Title
    const titleInput = createElement('input', 'labels');
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("name", "titleInput");
    titleInput.setAttribute("placeholder", "Enter task...");
    titleInput.setAttribute("id", "titleInput");
    appendAChild(newTaskForm, titleInput);
    

    //Create label for Description
    const descriptionLabel = createElement('label');
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.innerText = "Description";
    appendAChild(newTaskForm, descriptionLabel);

    //Create an input element for Description
    const taskDescription = createElement('input', 'labels');
    taskDescription.setAttribute("type", "text");
    taskDescription.setAttribute("name", "Description");
    taskDescription.setAttribute("placeholder", "Description");
    taskDescription.setAttribute("id", "taskDescription");
    appendAChild(newTaskForm, taskDescription);

    //Create an input element for Project
    const taskProject = createElement('input', 'labels');
    taskProject.setAttribute("type", "text");
    taskProject.setAttribute("name", "Project");
    taskProject.setAttribute("placeholder", "Project");
    taskProject.setAttribute("id", "taskProject");
    appendAChild(newTaskForm, taskProject);

    //Create an input element for dueDate
    const taskDueDate = createElement('input', 'labels');
    taskDueDate.setAttribute("type", "date");
    taskDueDate.setAttribute("name", "DueDate");
    taskDueDate.setAttribute("placeholder", "Due Date");
    taskDueDate.setAttribute("id", "taskDueDate");
    appendAChild(newTaskForm, taskDueDate);

    //Create an input element for Submit button
    const taskSubmit = createElement('input', 'labels');
    taskSubmit.setAttribute("type", "submit");
    taskSubmit.setAttribute("name", "submit");
    taskSubmit.setAttribute("placeholder", "Due Date");
    taskSubmit.setAttribute("id", "taskSubmit");
    appendAChild(newTaskForm, taskSubmit);



    appendAChild(formContainer, newTaskForm);
    appendAChild(body, formContainer);

    



}



