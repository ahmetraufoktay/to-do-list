import './style.css';
import { ProjectElement } from './project';
import './schedules';

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
        if (localStorage.getItem(`${projectname}`) === null) {
            localStorage.setItem(`${projectname}`,'[]');
            const project = new ProjectElement(projectname);
            const projectDiv = project.project();
            projects.appendChild(projectDiv);
        } else {
            const addproject = projectform.querySelector('input');
            addproject.value = 'NAME TAKEN';
        }
    }
    else {
        projectform.reportValidity();
    }
});

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    const project = new ProjectElement(key);
    const projectDiv = project.project();

    projects.appendChild(projectDiv);
}
