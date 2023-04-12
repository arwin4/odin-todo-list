const newTask = function newTask(name) {
  let taskName = name;
  return {
    getName: () => taskName,
    setName: (newName) => {
      taskName = newName;
    },
  };
};
