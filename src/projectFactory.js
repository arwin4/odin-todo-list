import { v4 as uuid } from 'uuid';
import taskFactory from './taskFactory';

const projectFactory = function projectFactory(name) {
  let projectName = name;
  let tasks = [];
  const projectID = uuid();

  function addTask(taskName, description, priority, dueDate, status) {
    const newTask = taskFactory(
      taskName,
      description,
      priority,
      dueDate,
      status,
    );
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

export default projectFactory;
