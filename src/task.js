import { v4 as uuid } from 'uuid';

const taskFactory = function taskFactory(name, description, priority, dueDate) {
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
  const getName = () => taskName;
  const getDescription = () => taskDescription;
  const getPriority = () => taskPriority;
  const getDueDate = () => taskDueDate;
  const getID = () => id;

  // Set task properties
  const setName = (string) => {
    taskName = string;
  };
  const setDescription = (string) => {
    taskDescription = string;
  };
  const setPriority = (string) => {
    taskPriority = string;
  };
  const setDueDate = (string) => {
    taskDueDate = string;
  };

  return {
    getName,
    getDescription,
    getPriority,
    getDueDate,
    getID,
    setName,
    setDescription,
    setPriority,
    setDueDate,
    toggleStatus,
  };
};

const projectFactory = function projectFactory(name) {
  let projectName = name;
  const tasks = [];
  const id = uuid();

  // Delete task by name

  // Get project properties
  const getName = () => projectName;
  const getTasks = () => tasks;
  const getID = () => id;

  // Set project properties
  const setName = (string) => {
    projectName = string;
  };

  const addTask = (task) => {
    tasks.push(task);
  };

  return {
    setName,
    addTask,
    getName,
    getTasks,
    getID,
  };
};

const projectManager = function projectManager() {
  // add project
  // delete project
};

export { taskFactory, projectFactory };
