import { format } from 'date-fns';
import { projectManager } from './task';

function DOM() {
  // DOM element reference
  return {
    // Templates
    taskTemplate: document.querySelector('.task-template'),
    projectTemplate: document.querySelector('.project-template'),

    // Containers
    contentContainer: document.querySelector('.content'),
    projectContainer: document.querySelector('.projects-container'),
  };
}

const deleteTask = (project, task) => project.deleteTask(task);
const addTask = (project, newTaskName) => project.addTask(newTaskName.value);

const deleteProject = (project) => projectManager.deleteProject(project);
const addProject = () => projectManager.addProject('Another project');

function changeDueDate(task, changeDateBtn, renderProjectsContainer) {
  const datePicker = document.createElement('input');
  datePicker.setAttribute('type', 'date');
  // Set date to current date
  datePicker.setAttribute('value', format(new Date(), 'yyyy-MM-dd'));
  datePicker.addEventListener('change', (e) => {
    const date = e.target.valueAsDate;
    task.setDueDate(date);
    renderProjectsContainer();
  });
  changeDateBtn.replaceWith(datePicker);
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
    taskCard.querySelector('.task-name').textContent = task.getName();
    // TODO: description, priority, etc...

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
    addTask(project, newTaskName);
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
    projectManager.addProject(newProjectName.value);
    renderProjects();
  });
}

function renderPage() {
  activatePageControls();
  renderProjects();
}

export default renderPage;
