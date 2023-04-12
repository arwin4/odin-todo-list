const newTask = function newTask(
  name,
  description,
  priority,
  dueDate,
  project,
) {
  let taskName = name;
  let taskDescription = description;
  let taskPriority = priority;
  let taskDueDate = dueDate;
  let taskProject = project;

  // Get task properties
  const getName = () => taskName;
  const getDescription = () => taskDescription;
  const getPriority = () => taskPriority;
  const getDueDate = () => taskDueDate;
  const getProject = () => taskProject;

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
  const setProject = (string) => {
    taskProject = string;
  };

  return {
    getName,
    getDescription,
    getPriority,
    getDueDate,
    getProject,
    setName,
    setDescription,
    setPriority,
    setDueDate,
    setProject,
  };
};

export default newTask;
