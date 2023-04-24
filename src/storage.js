import projectManager from './projectManager';

/*
For every project:
  get list of tasks
  make array of tasks for json
  for each task:
    make an object of the properties
    get all properties
    put each property in object: {name:'task1'}
    add the object to array of tasks
  stringify the array
  put in localstorage

  */

function saveToLocalStorage() {
  // Save all projects and their todos in localStorage
  const projects = projectManager.getProjects();
  const projectArray = [];
  Object.values(projects).forEach((project) => {
    // Since the project and task properties are encapsulated, create new
    // objects with exposed properties to store in localStorage.
    const tasks = project.getTasks();
    const taskArray = [];
    Object.values(tasks).forEach((task) => {
      const exposedTask = {};
      exposedTask.name = task.getName();
      exposedTask.description = task.getDescription();
      exposedTask.priority = task.getPriority();
      exposedTask.dueDate = task.getDueDate();
      // TODO: other properties
      taskArray.push(exposedTask);
    });

    const exposedProject = {};
    exposedProject.id = project.getID();
    exposedProject.name = project.getName();
    exposedProject.tasks = taskArray;
    projectArray.push(exposedProject);
  });
  localStorage.setItem('projects', JSON.stringify(projectArray));
}

function populateStorage() {
  const dummyProject = projectManager.addProject('A first little project');
  dummyProject.addTask('Exterminate all silverfish');
  dummyProject.addTask('Do a barrel roll');

  saveToLocalStorage();
}

function loadFromLocalStorage() {
  if (localStorage.length === 0) {
    populateStorage();
    return;
  }

  const parsedProject = JSON.parse(localStorage.projects);
  Object.values(parsedProject).forEach((project) => {
    const currentProject = projectManager.addProject(project.name);
    // TODO: get id back
    Object.values(project.tasks).forEach((task) => {
      currentProject.addTask(
        task.name,
        task.description,
        task.priority,
        new Date(task.dueDate),
        // TODO: more properties. (id and more)
      );
    });
  });
}

export { populateStorage, loadFromLocalStorage, saveToLocalStorage };
