import projectFactory from './projectFactory';
import { saveToLocalStorage } from './storage';

const projectManager = (() => {
  let projects = [];

  function addProject(name) {
    const newProject = projectFactory(name);
    projects.push(newProject);
    saveToLocalStorage();
    return newProject;
  }

  function deleteProject(projectToDelete) {
    // Mutates the array!
    const id = projectToDelete.getID();
    projects = projects.filter((project) => project.getID() !== id);
  }

  const getProjects = () => projects;

  return { addProject, deleteProject, getProjects };
})();

export default projectManager;
