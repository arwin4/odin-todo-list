import { v4 as uuid } from 'uuid';

const taskFactory = function taskFactory(
  project,
  name = 'Task',
  description = 'Description',
  priority = 'normal',
  dueDate = new Date(), // today
) {
  let projectID = project;
  let taskName = name;
  let taskDescription = description;
  let taskPriority = priority;
  let taskDueDate = dueDate;
  const id = uuid();

  let done = false;

  const toggleStatus = () => {
    done = !done;
  };

  // Get task properties
  const getProject = () => projectID;
  const getName = () => taskName;
  const getDescription = () => taskDescription;
  const getPriority = () => taskPriority;
  const getDueDate = () => taskDueDate;
  const getID = () => id;

  // Set task properties
  const setProject = (string) => {
    projectID = string;
  };

  const setName = (string) => {
    taskName = string;
  };
  const setDescription = (string) => {
    taskDescription = string;
  };
  const setPriority = (string) => {
    taskPriority = string;
  };
  const setDueDate = (newDate) => {
    // Only accept current or later date
    const newDateDay = newDate.setHours(0, 0, 0, 0);
    if (newDateDay < new Date().setHours(0, 0, 0, 0)) {
      return false;
    }
    taskDueDate = newDate;
    return true;
  };

  return {
    getProject,
    getName,
    getDescription,
    getPriority,
    getDueDate,
    getID,
    setProject,
    setName,
    setDescription,
    setPriority,
    setDueDate,
    toggleStatus,
  };
};

const projectFactory = function projectFactory(name) {
  let projectName = name;
  let tasks = [];
  const projectID = uuid();

  function addTask(taskName) {
    const newTask = taskFactory(projectID, taskName);
    tasks.push(newTask);
    return newTask;
  }

  function deleteTask(taskToDelete) {
    // Mutates the array!
    const id = taskToDelete.getID();
    tasks = tasks.filter((task) => task.getID() !== id);
  }

  // Get project properties
  const getName = () => projectName;
  const getTasks = () => tasks;
  const getID = () => projectID;

  // Set project properties
  const setName = (string) => {
    projectName = string;
  };

  return {
    setName,
    addTask,
    deleteTask,
    getName,
    getTasks,
    getID,
  };
};

const projectManager = (() => {
  let projects = [];

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

  const getProjects = () => projects;
  // delete project

  return { addProject, deleteProject, getProjects };
})();

export { taskFactory, projectFactory, projectManager };
