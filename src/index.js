import projectManager from './projectManager';
import renderPage from './screen';
import './style.css';
import 'material-icons/iconfont/material-icons.css';
import { localStorageLoad, localStorageSave } from './storage';

const project1 = projectManager.addProject('My first project');
projectManager.addProject('My second project');
const project3 = projectManager.addProject('My third project');
project1.addTask('Water the plants');
project1.addTask('Exterminate all the silverfish');
project3.addTask('task 4545');
project3.addTask('task 1001', 'testdescription');
// console.log(project3.getTasks()[0].getDueDate());

if (localStorage.length === 0) {
  console.log('Nothing stored yet.');
  // populateStorage();
  // localStorage.setItem('manager', projectManager);
}

localStorageSave();
localStorageLoad();

renderPage();
