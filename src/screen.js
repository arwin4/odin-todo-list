/* eslint-disable no-alert */
import { format } from 'date-fns';
import projectManager from './projectManager';

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
    mainContent: document.querySelector('.main-content'),
    projectContainer: document.querySelector('.project-container'),
    taskContainer: document.querySelector('.task-container'),

    // Controls
    newProjectForm: document.querySelector('.new-project-form'),
    newProjectName: document.querySelector('.new-project-input'),
    resetProjectsBtn: document.querySelector('.reset-projects'),

    // Other
    projectList: document.querySelector('.project-list'),
  };
}

function projectDOM(projectCard) {
  // Project card element reference
  return {
    projectName: projectCard.querySelector('.project-name'),

    // Controls
    deleteBtn: projectCard.querySelector('.delete-project'),
    renameBtn: projectCard.querySelector('.rename-project'),
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
    markDoneBtn: taskCard.querySelector('.mark-done'),
    doneText: taskCard.querySelector('.done-text'),
    deleteBtn: taskCard.querySelector('.delete-task'),
    renameBtn: taskCard.querySelector('.rename-task'),
    descriptionBtn: taskCard.querySelector('.edit-description'),
    changeDateBtn: taskCard.querySelector('.change-duedate'),
  };
}

// Data change functions
// Tasks
const toggleDoneStatus = (task) => task.toggleStatus(task.getStatus());
const renameTask = (newName, task) => task.setName(newName);
const setDescription = (string, task) => task.setDescription(string);
const setPriority = (priority, task) => task.setPriority(priority);
const setDueDate = (date, task) => task.setDueDate(date);
// Projects
const deleteTask = (task, project) => project.deleteTask(task);
const addTask = (newName, project) => project.addTask(newName.value);
const deleteProject = (project) => projectManager.deleteProject(project);
const addProject = (newName) => projectManager.addProject(newName.value);
const renameProject = (newName, project) => {
  projectManager.renameProject(newName, project);
};

function restageMainContent() {
  const { mainContent } = DOM();
  if (mainContent !== null) mainContent.replaceChildren();

  // Rebuild child elements
  const projectContainer = document.createElement('div');
  projectContainer.classList.add('project-container');
  mainContent.appendChild(projectContainer);
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task-container');
  mainContent.appendChild(taskContainer);
}

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
  // Mark task done
  const doneBtn = taskDOM(taskCard).markDoneBtn;
  const { doneText } = taskDOM(taskCard);
  doneBtn.addEventListener('click', () => {
    if (task.getStatus() === false) {
      // Close task card and make transparent
      doneText.textContent = 'Mark undone';
      taskCard.firstElementChild.removeAttribute('open');
      taskCard.classList.add('marked-done');
    } else {
      taskCard.classList.remove('marked-done');
      doneText.textContent = 'Mark done';
    }
    toggleDoneStatus(task);
  });

  // Task delete
  taskDOM(taskCard).deleteBtn.addEventListener('click', () => {
    deleteTask(task, project);
    taskCard.remove();
  });

  // Rename task
  taskDOM(taskCard).renameBtn.addEventListener('click', () => {
    const newName = prompt('Enter a new name for this task');
    if (newName === null || newName.length < 1) return;
    renameTask(newName, task);
    taskDOM(taskCard).nameElem.textContent = newName;
  });

  // Edit description
  taskDOM(taskCard).descriptionBtn.addEventListener('click', () => {
    const newDescription = prompt('Enter a new description');
    if (newDescription === null || newDescription.length < 1) return;
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

function renderTasks(project) {
  const { taskContainer } = DOM();
  // Clear the task container
  if (taskContainer !== null) taskContainer.replaceChildren();

  const tasks = project.getTasks();
  Object.values(tasks).forEach((task) => {
    // Create task card
    const { taskTemplate } = DOM();
    const taskCard = taskTemplate.content.firstElementChild.cloneNode(true);

    // Render task properties
    if (task.getStatus()) {
      taskDOM(taskCard).doneText.textContent = 'Mark undone';
      taskCard.classList.add('marked-done');
    }
    taskDOM(taskCard).nameElem.textContent = task.getName();
    taskDOM(taskCard).descriptionContent.textContent = task.getDescription();
    renderPriority(task, taskCard);
    renderDate(task, taskCard);

    activateTaskControls(task, project, taskCard);

    taskContainer.appendChild(taskCard);
  });
}

function renderProjectList() {
  // Clear the list
  const listElem = DOM().projectList;
  listElem.replaceChildren();

  const projects = projectManager.getProjects();
  Object.values(projects).forEach((project) => {
    const projectItem = document.createElement('li');
    projectItem.textContent = project.getName();

    projectItem.addEventListener('click', () => {
      // eslint-disable-next-line no-use-before-define
      renderProject(project);
    });

    listElem.appendChild(projectItem);
  });
}

function renderProject(project) {
  restageMainContent();

  // Create project card
  const templateCard = DOM().projectTemplate;
  const projectCard = templateCard.content.firstElementChild.cloneNode(true);

  // Render project name
  projectDOM(projectCard).projectName.textContent = project.getName();

  renderTasks(project, projectCard);

  // Activate delete project button
  projectDOM(projectCard).deleteBtn.addEventListener('click', () => {
    deleteProject(project);
    restageMainContent();
    renderProjectList();
  });

  // Activate rename project button
  projectDOM(projectCard).renameBtn.addEventListener('click', () => {
    const newName = prompt('Enter a new name for this project');
    if (newName === null || newName.length < 1) return;
    renameProject(newName, project);
    renderProjectList();
    renderProject(project);
  });

  // Activate new task input
  const { newTaskName } = projectDOM(projectCard);
  projectDOM(projectCard).newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (newTaskName.value.length < 1) return;
    addTask(newTaskName, project);
    renderTasks(project, projectCard);
    newTaskName.value = '';
  });

  DOM().projectContainer.appendChild(projectCard);
  newTaskName.focus();
}

function activatePageControls() {
  const { newProjectName } = DOM();
  DOM().newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (newProjectName.value.length < 1) return;
    const newProject = addProject(newProjectName);
    renderProject(newProject);
    renderProjectList();
    newProjectName.value = '';
  });

  const { resetProjectsBtn } = DOM();
  resetProjectsBtn.addEventListener('click', () => {
    projectManager.resetProjects();
    restageMainContent();
    renderProjectList();
  });
}

function renderPage() {
  activatePageControls();
  renderProjectList();
}

export default renderPage;
