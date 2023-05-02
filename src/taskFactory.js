import { v4 as uuid } from 'uuid';

const taskFactory = function taskFactory(
  name = 'Task',
  description = 'A descriptive description',
  priority = 'normal',
  dueDate = new Date(), // today
) {
  let taskName = name;
  let taskDescription = description;
  let taskPriority = priority;
  let taskDueDate = dueDate;
  const id = uuid();

  // TODO: implement this in UI
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

export default taskFactory;
