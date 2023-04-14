import { newTask, newProject } from './task';

const task1 = newTask('name of task 1');
task1.setName('newname');
console.log(task1.getName());

const project1 = newProject('project1');
console.log(project1.getName());
project1.addTask(task1);
console.log(project1.getTasks()[0].getName());
