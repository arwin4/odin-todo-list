import newTask from './task';

const task1 = newTask('name of task 1');
task1.setName('newname');
console.log(task1.getName());
