import { appendAChild, createElement, addFormField, saveFormData} from "./generalFunctions";

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
    addFormField('label', {class: 'taskLabel', for: 'taskTitle'}, 'Title', titleContainer);

    //Create an input element for Title
    addFormField('input', {class: 'taskInput', type: 'text',
    name: 'taskTitle', placeholder: 'Enter task...', id: 'taskTitle', required: true}, '', titleContainer);

    //Create Task Details container
    const taskDetailsContainer = addFormField('div', {class: 'innerContainer', id: 'taskDetailsContainer'}, '', newTaskForm);
    addFormField('label', {class: 'taskLabel', for: 'taskDetails'}, 'Task Details', taskDetailsContainer);

    //Create label for Due Date
    const dueDateContainer = addFormField('div', {class: 'innerContainer'}, '', taskDetailsContainer);
    addFormField('label', {class: 'taskLabel', for: 'taskDescription'}, 'Due Date', dueDateContainer);

    //Create an input element for dueDate
    addFormField('input', {class: 'taskInput', type: 'date', value: '',
    name: 'taskDueDate', id: 'taskDueDate'}, '', dueDateContainer);
   
    //Create label for Projects
    const projectContainer = addFormField('div', {class: 'innerContainer', id: 'projectContainer', value: ''}, '', taskDetailsContainer);
    addFormField('label', {class: 'taskLabel', for: 'taskProject'}, 'Project', projectContainer);
 
    //Create a select element for Projects
    addFormField('div', {class: 'taskInput taskProject',
    name: 'taskProject', id: 'taskProject'}, '', projectContainer);

    //Create label for Priority
    const priorityContainer = addFormField('div', {class: 'innerContainer', id: 'priorityContainer', value: ''}, '', taskDetailsContainer);
    addFormField('label', {class: 'taskLabel', for: 'taskPriority'}, 'Priority', priorityContainer);
 
    //Create a select element for Priority
    addFormField('div', {class: 'taskInput taskPriority',
    name: 'taskPriority', id: 'taskPriority'}, '', priorityContainer);

    //Create an input element for Description
    const descriptionContainer = addFormField('div', {class: 'innerContainer'}, '', taskDetailsContainer);
    addFormField('input', {class: 'taskInput', type: 'text',
    name: 'taskDescription', placeholder: 'Add description', id: 'taskDescription', value: ''}, '', descriptionContainer);

    //Create an submit element to save Task
    addFormField('input', {class: 'taskInput', type: 'submit',
    name: 'taskSaveButton', id: 'taskSaveButton'}, 'Create task', newTaskForm);

    appendAChild(formContainer, newTaskForm);
    appendAChild(body, formContainer);

    return newTaskForm

    



}




