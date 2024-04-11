import './style.css';
import { ProjectElement } from './project';
import { finish } from './schedules';

localStorage.setItem('projects','{}');
localStorage.setItem('taskcount',0);

const projectInput = document.getElementById('projectname');
let projectname;

projectInput.addEventListener('change',() => {
    projectname = projectInput.value;
})

const projects = document.getElementById('projects');

const projectform = document.getElementById('projectform');
projectform.addEventListener('submit', (e) => {
    e.preventDefault();
    const projectStorage = JSON.parse(localStorage.getItem('projects'));

    if(projectform.checkValidity()) {
        if (!projectStorage[`${projectname}`]) {
            projectStorage[`${projectname}`] = '{}';
            localStorage.setItem('projects', JSON.stringify(projectStorage));
            console.log(projectStorage);
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

/* for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    const project = new ProjectElement(key);
    const projectDiv = project.project();

    projects.appendChild(projectDiv);
} */

const timelists = document.getElementById('time-lists');
timelists.appendChild(finish);