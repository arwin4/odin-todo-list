import projectManager from './projectManager';
import renderPage from './screen';
import './style.css';
import 'material-icons/iconfont/material-icons.css';

projectManager.loadFromLocalStorage();

renderPage();
