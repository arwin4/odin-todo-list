import { format } from 'date-fns';
import { projectManager } from './task';

function DOM() {
  // DOM element getter
  return {
    contentContainer: document.querySelector('.content'),
    projectContainer: document.querySelector('.projects-container'),
  };
}

const deleteTask = (project, task) => project.deleteTask(task);
const addTask = (project) => project.addTask('Another task');

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

function renderTasks(project, renderProjectsContainer) {
  // The projects (and tasks) are re-rendered completely every time a change is
  // made to the data. Not efficient.

  const tasks = project.getTasks();
  Object.values(tasks).forEach((task) => {
    // Render task names
    const taskName = document.createElement('p');
    taskName.textContent = task.getName();
    DOM().projectContainer.appendChild(taskName);

    // Render task due date
    const dueDate = document.createElement('p');
    const date = task.getDueDate();
    dueDate.textContent = format(date, 'PP');
    DOM().projectContainer.appendChild(dueDate);

    // Render due date change button
    const changeDateBtn = document.createElement('button');
    changeDateBtn.textContent = 'Change due date';
    changeDateBtn.addEventListener('click', () => {
      changeDueDate(task, changeDateBtn, renderProjectsContainer);
    });
    DOM().projectContainer.appendChild(changeDateBtn);

    // Render delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.addEventListener('click', () => {
      deleteTask(project, task);
      renderProjectsContainer();
    });
    DOM().projectContainer.appendChild(deleteBtn);
  });
}

function renderProjects() {
  // The projects (and tasks) are re-rendered completely every time a change is
  // made to the data. Not efficient.

  // Clear the container for render
  DOM().projectContainer.replaceChildren();

  const projects = projectManager.getProjects();
  Object.values(projects).forEach((project) => {
    // Render project names
    const projectName = document.createElement('h2');
    projectName.textContent = project.getName();
    DOM().projectContainer.appendChild(projectName);

    // Render delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete project';
    deleteBtn.addEventListener('click', () => {
      deleteProject(project);
      renderProjects();
    });
    DOM().projectContainer.appendChild(deleteBtn);

    // Render new task button
    const newTaskBtn = document.createElement('button');
    newTaskBtn.textContent = 'Add new task';
    newTaskBtn.addEventListener('click', () => {
      addTask(project);
      renderProjects();
    });
    DOM().projectContainer.appendChild(newTaskBtn);

    // Render the tasks inside the projects
    renderTasks(project, renderProjects);
  });
}

function renderPage() {
  const addProjectBtn = document.createElement('button');
  addProjectBtn.textContent = 'Add new project';
  addProjectBtn.addEventListener('click', () => {
    addProject();
    renderProjects();
  });
  DOM().contentContainer.appendChild(addProjectBtn);

  renderProjects();
}

export default renderPage;
