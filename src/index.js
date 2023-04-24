import projectManager from './projectManager';
import renderPage from './screen';
import './style.css';
import 'material-icons/iconfont/material-icons.css';
import {
  populateStorage,
  loadFromLocalStorage,
  saveToLocalStorage,
} from './storage';

loadFromLocalStorage();

// const projects = projectManager.getProjects();
// saveToLocalStorage(projects);

renderPage();
