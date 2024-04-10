import './style.css';
import { ProjectElement } from './project';

const projectInput = document.getElementById('projectname');
let projectname;

projectInput.addEventListener('change',() => {
    projectname = projectInput.value;
})

const projects = document.getElementById('projects');

const projectform = document.getElementById('projectform');
projectform.addEventListener('submit', (e) => {
    e.preventDefault();

    if(projectform.checkValidity()) {
        const project = new ProjectElement(projectname);
        const projectDiv = project.project();

        projects.appendChild(projectDiv);
    }
    else {
        projectform.reportValidity();
    }
});

