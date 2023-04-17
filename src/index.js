import { taskFactory, projectFactory, projectManager } from './task';
import renderPage from './screen';
import './style.css';

const project1 = projectManager.addProject('My first project');
projectManager.addProject('My second project');
const project3 = projectManager.addProject('My third project');
project1.addTask('Water the plants');
project1.addTask('Exterminate all the silverfish');
project3.addTask('task 4545');
project3.addTask('task 1001');

renderPage();
