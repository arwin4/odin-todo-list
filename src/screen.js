import { format } from 'date-fns';
import { projectManager } from './task';

function DOM() {
  // Global DOM element reference
  return {
    // Templates
    taskTemplate: document.querySelector('.task-template'),
    projectTemplate: document.querySelector('.project-template'),

    // Containers
    contentContainer: document.querySelector('.content'),
    projectContainer: document.querySelector('.projects-container'),
  };
}

function taskDOM(taskCard) {
  // Task card element reference
  return {
    nameElem: taskCard.querySelector('.task-name'),
    descriptionElem: taskCard.querySelector('.duedate'),
    priorirtyElem: taskCard.querySelector('.priority'),
  };
}

// Data change functions
// Tasks
const deleteTask = (task, project) => project.deleteTask(task);
const addTask = (newName, project) => project.addTask(newName.value);
// Projects
const deleteProject = (project) => projectManager.deleteProject(project);
const addProject = (newName) => projectManager.addProject(newName.value);

function renderDate(task, taskCard) {
  taskDOM(taskCard).descriptionElem.textContent = format(
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

  datePicker.addEventListener('change', (e) => {
    // Set new date internally
    const date = e.target.valueAsDate;
    task.setDueDate(date);

    // Update displayed date
    renderDate(task, taskCard);
    datePicker.remove();

    // Re-enable the change date button
    const dateButton = changeDateBtn;
    dateButton.disabled = false;
  });
}

function activateTaskControls(task, project, taskCard) {
  // Activate task delete button
  const deleteBtn = taskCard.querySelector('.delete-task');
  deleteBtn.addEventListener('click', () => {
    deleteTask(task, project);
    taskCard.remove();
  });

  // Activate change due date button
  const changeDateBtn = taskCard.querySelector('.change-duedate');
  changeDateBtn.addEventListener('click', () => {
    changeDueDate(task, changeDateBtn, taskCard);
    changeDateBtn.disabled = true;
  });
}

function renderTasks(project, projectCard) {
  const taskContainer = projectCard.querySelector('.task-container');

  // Clear the task container
  taskContainer.replaceChildren();

  const tasks = project.getTasks();
  Object.values(tasks).forEach((task) => {
    // Create task card
    const { taskTemplate } = DOM();
    const taskCard = taskTemplate.content.firstElementChild.cloneNode(true);

    // Render task properties
    taskDOM(taskCard).nameElem.textContent = task.getName();
    taskDOM(taskCard).descriptionElem.textContent = task.getDescription();
    taskDOM(taskCard).priorirtyElem.textContent = task.getPriority();
    renderDate(task, taskCard);

    activateTaskControls(task, project, taskCard);

    taskContainer.appendChild(taskCard);
  });
}

function activateProjectControls(projectCard, project) {
  // Activate delete project button
  const deleteBtn = projectCard.querySelector('.delete-project');
  deleteBtn.addEventListener('click', () => {
    deleteProject(project);
    projectCard.remove();
  });

  // Activate new task input
  const newTaskForm = projectCard.querySelector('.new-task-form');
  const newTaskName = projectCard.querySelector('.new-task-input');
  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(newTaskName, project);
    renderTasks(project, projectCard);
  });
}

function renderProjects() {
  // Clear the project container
  DOM().projectContainer.replaceChildren();

  const projects = projectManager.getProjects();
  Object.values(projects).forEach((project) => {
    // Create project card
    const templateCard = document.querySelector('.project-template');
    const projectCard = templateCard.content.firstElementChild.cloneNode(true);

    // Render project name
    projectCard.querySelector('.project-name').textContent = project.getName();

    renderTasks(project, projectCard);

    activateProjectControls(projectCard, project);

    DOM().projectContainer.appendChild(projectCard);
  });
}

function activatePageControls() {
  const newProjectForm = document.querySelector('.new-project-form');
  const newProjectName = document.querySelector('.new-project-input');
  newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // projectManager.addProject(newProjectName.value);
    addProject(newProjectName);
    renderProjects();
  });
}

function renderPage() {
  activatePageControls();
  renderProjects();
}

export default renderPage;
