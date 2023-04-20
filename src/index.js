import { taskFactory, projectFactory, projectManager } from './task';
import renderPage from './screen';
import './style.css';
import 'material-icons/iconfont/material-icons.css';

const project1 = projectManager.addProject('My first project');
projectManager.addProject('My second project');
const project3 = projectManager.addProject('My third project');
project1.addTask('Water the plants');
project1.addTask('Exterminate all the silverfish');
project3.addTask('task 4545');
project3.addTask('task 1001');

if (localStorage.length === 0) {
  console.log('Nothing stored yet.');
  // populateStorage();
  // localStorage.setItem('manager', projectManager);
}

localStorage.setItem('manager', JSON.stringify(project1.getID()));
localStorage.setItem('manager2', JSON.stringify(projectManager.getProjects()));
console.log(localStorage.length);

renderPage();
