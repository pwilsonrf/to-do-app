import { appendAChild, createElement, addFormField} from "./generalFunctions";

export function newTaskDialog(){
    const body = document.querySelector('body');

    //Form Container
    const formContainer = createElement('div','formContainer', 'formContainer');

    //Create newTaskForm container
    const newTaskForm = addFormField('form', {action: '', id: 'newTaskForm'}, '', formContainer)
    const newTaskHeader = createElement('h2', 'heading2', 'NewTaskHeading', 'Create a new task');
    appendAChild(newTaskForm, newTaskHeader);

    //Create label for Title
    const titleContainer = addFormField('div', {class: 'innerContainer'}, '', newTaskForm);
    addFormField('label', {class: 'taskLabel', for: 'taskDescription'}, 'Title', titleContainer);

    //Create an input element for Title
    addFormField('input', {class: 'taskInput', type: 'text',
    name: 'titleInput', placeholder: 'Enter task...', id: 'titleInput'}, '', titleContainer);

   
    //Create an input element for Project
    addFormField('input', {class: 'taskInput', type: 'text',
    name: 'taskProject', placeholder: 'Project', id: 'taskProject'}, '', newTaskForm);

    //Create Task Details container
    const taskDetailsContainer = addFormField('div', {class: 'innerContainer', id: 'taskDetailsContainer'}, '', newTaskForm);
    addFormField('label', {class: 'taskLabel', for: 'taskDetails'}, 'Task Details', taskDetailsContainer);

    //Create label for Due Date
    const dueDateContainer = addFormField('div', {class: 'innerContainer'}, '', taskDetailsContainer);
    addFormField('label', {class: 'taskLabel', for: 'taskDescription'}, 'Due Date', dueDateContainer);

    //Create an input element for dueDate
    addFormField('input', {class: 'taskInput', type: 'date',
    name: 'taskDueDate', id: 'taskDueDate'}, '', dueDateContainer);

     //Create label for Priority
     const priorityContainer = addFormField('div', {class: 'innerContainer'}, '', taskDetailsContainer);
     addFormField('label', {class: 'taskLabel', for: 'taskPriority'}, 'Priority', priorityContainer);
 
    //Create a select element for Priority
    addFormField('select', {class: 'taskInput',
    name: 'taskDueDate', id: 'taskDueDate'}, '', priorityContainer);

     //Create an input element for Description
     const descriptionContainer = addFormField('div', {class: 'innerContainer'}, '', taskDetailsContainer);
     addFormField('input', {class: 'taskInput', type: 'text',
     name: 'taskDescription', placeholder: 'Add description', id: 'taskDescription'}, '', descriptionContainer);
 
    //Create an submit element to save Task
    addFormField('input', {class: 'taskInput', type: 'submit',
    name: 'taskSaveButton', id: 'taskSaveButton'}, 'Create task', newTaskForm);

    appendAChild(formContainer, newTaskForm);
    appendAChild(body, formContainer);

    



}



