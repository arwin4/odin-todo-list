/* eslint-disable no-alert */
import { format } from 'date-fns';
import projectManager from './projectManager';
import { saveToLocalStorage } from './storage';

// NOTE: adding reference functions for DOM elements enhanced some functions
// readability, but I think it actually turned out overly complicated for such a
// small project. For any bigger project, you'd probably want to use a framework
// anyway, making these functions redundant.
function DOM() {
  // Global DOM element reference
  return {
    // Templates
    taskTemplate: document.querySelector('.task-template'),
    projectTemplate: document.querySelector('.project-template'),

    // Containers
    contentContainer: document.querySelector('.content'),
    projectContainer: document.querySelector('.projects-container'),

    // Controls
    newProjectForm: document.querySelector('.new-project-form'),
    newProjectName: document.querySelector('.new-project-input'),
  };
}

function projectDOM(projectCard) {
  // Project card element reference
  return {
    projectName: projectCard.querySelector('.project-name'),
    taskContainer: projectCard.querySelector('.task-container'),

    // Controls
    deleteBtn: projectCard.querySelector('.delete-project'),
    newTaskForm: projectCard.querySelector('.new-task-form'),
    newTaskName: projectCard.querySelector('.new-task-input'),
  };
}

function taskDOM(taskCard) {
  // Task card element reference
  return {
    nameElem: taskCard.querySelector('.task-name'),
    descriptionContainer: taskCard.querySelector('.description-container'),
    descriptionContent: taskCard.querySelector('.description-content'),
    priorityElem: taskCard.querySelector('.priority'),
    dueDateElem: taskCard.querySelector('.duedate'),

    // Controls
    deleteBtn: taskCard.querySelector('.delete-task'),
    descriptionBtn: taskCard.querySelector('.edit-description'),
    changeDateBtn: taskCard.querySelector('.change-duedate'),
  };
}

// Data change functions
// Tasks
const setPriority = (priority, task) => task.setPriority(priority);
const setDueDate = (date, task) => task.setDueDate(date);
const setDescription = (string, task) => task.setDescription(string);
// Projects
const deleteTask = (task, project) => project.deleteTask(task);
const addTask = (newName, project) => project.addTask(newName.value);
const deleteProject = (project) => projectManager.deleteProject(project);
const addProject = (newName) => projectManager.addProject(newName.value);

function renderPriority(task, taskCard) {
  const priority = task.getPriority();
  const { priorityElem } = taskDOM(taskCard);

  const options = priorityElem.children;
  for (let i = 0; i < options.length; i += 1) {
    if (options[i].value === priority) {
      options[i].setAttribute('selected', '');
    } else {
      options[i].removeAttribute('selected', '');
    }
  }
}

function renderDate(task, taskCard) {
  taskDOM(taskCard).dueDateElem.textContent = format(
    task.getDueDate(),
    'PP', // Semi-short date format
  );
}

function changeDueDate(task, changeDateBtn, taskCard) {
  // Show the datepicker
  const datePicker = document.createElement('input');
  datePicker.setAttribute('type', 'date');
  changeDateBtn.after(datePicker);
  datePicker.showPicker();

  // Show cancel putton
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel change';
  datePicker.after(cancelBtn);

  cancelBtn.addEventListener('click', () => {
    datePicker.remove();
    cancelBtn.remove();
    const dateBtn = changeDateBtn;
    dateBtn.hidden = false;
    dateBtn.firstElementChild.hidden = false;
  });

  datePicker.addEventListener('change', (e) => {
    // Set new date internally
    const date = e.target.valueAsDate;
    if (!setDueDate(date, task)) {
      alert(
        `Sorry, you can't pick a date in the past for your task.
You've got to be more realistic about your goals!`,
      );
    }

    // Update displayed date
    renderDate(task, taskCard);
    datePicker.remove();

    // Re-enable the change date button
    const dateBtn = changeDateBtn;
    dateBtn.hidden = false;
    dateBtn.firstElementChild.hidden = false;

    // Remove cancel button
    cancelBtn.remove();
  });
}

function activateTaskControls(task, project, taskCard) {
  // Task delete
  taskDOM(taskCard).deleteBtn.addEventListener('click', () => {
    deleteTask(task, project);
    taskCard.remove();
  });

  // Edit description
  taskDOM(taskCard).descriptionBtn.addEventListener('click', () => {
    const newDescription = prompt('Enter a new description');
    setDescription(newDescription, task);
    taskDOM(taskCard).descriptionContent.textContent = task.getDescription();
  });

  // Change priority
  const { priorityElem } = taskDOM(taskCard);
  priorityElem.addEventListener('change', () => {
    const priority = priorityElem.selectedOptions[0].value;
    setPriority(priority, task);
  });

  // Change due date
  const { changeDateBtn } = taskDOM(taskCard);
  changeDateBtn.addEventListener('click', () => {
    changeDateBtn.hidden = true;
    changeDateBtn.firstElementChild.hidden = true;
    changeDueDate(task, changeDateBtn, taskCard);
  });
}

function renderTasks(project, projectCard) {
  const { taskContainer } = projectDOM(projectCard);
  // Clear the task container
  taskContainer.replaceChildren();

  const tasks = project.getTasks();
  Object.values(tasks).forEach((task) => {
    // Create task card
    const { taskTemplate } = DOM();
    const taskCard = taskTemplate.content.firstElementChild.cloneNode(true);

    // Render task properties
    taskDOM(taskCard).nameElem.textContent = task.getName();
    taskDOM(taskCard).descriptionContent.textContent = task.getDescription();
    renderPriority(task, taskCard);
    renderDate(task, taskCard);

    activateTaskControls(task, project, taskCard);

    taskContainer.appendChild(taskCard);
  });
}

function activateProjectControls(projectCard, project) {
  // Activate delete project button
  projectDOM(projectCard).deleteBtn.addEventListener('click', () => {
    deleteProject(project);
    projectCard.remove();
  });

  // Activate new task input
  const { newTaskName } = projectDOM(projectCard);
  projectDOM(projectCard).newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(newTaskName, project);
    renderTasks(project, projectCard);
    newTaskName.value = '';
  });
}

function renderProjects() {
  // Clear the project container
  DOM().projectContainer.replaceChildren();

  const projects = projectManager.getProjects();
  Object.values(projects).forEach((project) => {
    // Create project card
    const templateCard = DOM().projectTemplate;
    const projectCard = templateCard.content.firstElementChild.cloneNode(true);

    // Render project name
    projectDOM(projectCard).projectName.textContent = project.getName();

    renderTasks(project, projectCard);

    activateProjectControls(projectCard, project);

    DOM().projectContainer.appendChild(projectCard);
  });
}

function activatePageControls() {
  const { newProjectName } = DOM();
  DOM().newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addProject(newProjectName);
    renderProjects();
    newProjectName.value = '';
  });
}

function renderPage() {
  activatePageControls();
  renderProjects();
}

export default renderPage;
