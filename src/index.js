import { taskFactory, projectFactory, projectManager } from './task';
import renderPage from './screen';

const project1 = projectManager.addProject('My first project');
projectManager.addProject('My second project');
project1.addTask('Water the plants');
project1.addTask('Exterminate all the silverfish');

renderPage();
