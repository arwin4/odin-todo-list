import projectFactory from './projectFactory';

const projectManager = (() => {
  let projects = [];

  // localStorage functions
  function saveToLocalStorage() {
    // Save all projects and their todos in localStorage
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
        exposedTask.status = task.getStatus();
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
    dummyProject.addTask('Dig a hole');

    const dummyProject2 = projectManager.addProject(
      'This project has a bit of a looooooooooong name',
    );
    dummyProject2.addTask('Take a day off');

    saveToLocalStorage();
  }

  function loadFromLocalStorage() {
    if (localStorage.length === 0) {
      populateStorage();
      return;
    }

    const parsedProject = JSON.parse(localStorage.getItem('projects'));
    Object.values(parsedProject).forEach((project) => {
      const currentProject = projectManager.addProject(project.name);
      // TODO: get id back
      Object.values(project.tasks).forEach((task) => {
        currentProject.addTask(
          task.name,
          task.description,
          task.priority,
          new Date(task.dueDate),
          task.status,
          // TODO: more properties. (id and more)
        );
      });
    });
    saveToLocalStorage();
  }

  function addProject(name) {
    const newProject = projectFactory(name);
    projects.push(newProject);
    return newProject;
  }

  function deleteProject(projectToDelete) {
    // Mutates the array!
    const id = projectToDelete.getID();
    projects = projects.filter((project) => project.getID() !== id);
  }

  function renameProject(newName, projectToRename) {
    const id = projectToRename.getID();
    const foundProject = projects.find((project) => project.getID() === id);
    foundProject.setName(newName);
  }

  function resetProjects() {
    projects = [];
    populateStorage();
  }

  const getProjects = () => projects;

  function saveProjectsRegularly() {
    setInterval(saveToLocalStorage, 500);
  }

  saveProjectsRegularly();

  return {
    addProject,
    deleteProject,
    renameProject,
    resetProjects,
    getProjects,
    loadFromLocalStorage,
  };
})();

export default projectManager;
