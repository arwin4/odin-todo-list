import { projectManager } from './task';

const removeTaskObject = (project, task) => project.deleteTask(task.getID());

const projectContainer = document.querySelector('.projects-container');

function renderProjects() {
  // The projects (and tasks) are re-rendered completely every time a change is
  // made to the data. Not efficient.

  // Clear the container for render
  projectContainer.replaceChildren();

  const projects = projectManager.getProjects();
  Object.values(projects).forEach((project) => {
    // Render the project names
    const projectName = document.createElement('h2');
    projectName.textContent = project.getName();
    projectContainer.appendChild(projectName);

    // Render the tasks inside the projects
    const tasks = project.getTasks();
    Object.values(tasks).forEach((task) => {
      const taskName = document.createElement('p');
      taskName.textContent = task.getName();
      projectContainer.appendChild(taskName);

      // Render delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete task';
      deleteBtn.addEventListener('click', () => {
        // Delete task in project object
        removeTaskObject(project, task);
        // Re-render
        renderProjects();
      });
      projectContainer.appendChild(deleteBtn);
    });
  });
}

export default renderProjects;
