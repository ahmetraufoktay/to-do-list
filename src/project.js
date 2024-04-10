import { TaskElement } from './task';

class ProjectElement {
    constructor(name) {
        this.name = name;
        this.nameelement = null;
        this.projectelement = null;
        this.sectionelement = null;
    }
    project() {
        const project = document.createElement('div');
        project.classList = 'project';
        project.appendChild(this.logo());

        /* this.projectname() is necessary to define this.nameelement */
        this.projectname();
        project.appendChild(this.nameelement);
        
        project.appendChild(this.count());
        project.appendChild(this.edit());
        project.appendChild(this.remove());
        this.projectelement = project;
        this.projectelement.addEventListener('click',()=>this.createsection());
        return project;
    }
    logo() {
        const logo = document.createElement('span');
        logo.innerHTML = 'logo';
        return logo;
    }
    projectname() {
        const name = document.createElement('span');
        name.innerHTML = this.name;
        this.nameelement = name;
    }
    count() {
        const number = document.createElement('span');
        number.innerHTML = '0';
        return number;
    }
    edit() {
        const edit = document.createElement('button');
        edit.innerHTML = '|';

        let isEditing = false;

        const projectinput = document.createElement('input');
        projectinput.type = 'text';
        projectinput.className = 'projectedit';
        projectinput.addEventListener('change',() => {
            this.name = projectinput.value;
        })

        edit.addEventListener('click',()=> {
            if (isEditing) {
                this.nameelement = document.createElement('div');
                this.nameelement.innerHTML = `${this.name}`;
    
                this.projectelement.replaceChild(this.nameelement,projectinput);
                isEditing = false;
            } else {
                this.projectelement.replaceChild(projectinput,this.nameelement);
                isEditing = true;
            }
            edit.innerHTML = isEditing ? '+' : '|';
        })
        return edit;
    }
    remove() {
        const remove = document.createElement('button');
        remove.innerHTML = 'x';
        remove.addEventListener('click',() => {
            const projects = document.getElementById('projects');
            projects.removeChild(this.projectelement);
        })
        return remove;
    }
    createsection() {
        const container = document.createElement('div');
        
        const header = document.createElement('header');
        console.log(this.name);
        header.innerHTML = `${this.name}`;

        const tasks = document.createElement('div');
        tasks.id = 'tasks';

        const taskform = document.createElement('form');
        taskform.id = 'taskform';

        let taskname;
        let date;

        const taskInput = document.createElement('input');
        taskInput.id = 'taskname';
        taskInput.placeholder = 'Task Name';
        taskInput.required = true;

        taskInput.addEventListener('change',() => {
            taskname = taskInput.value;
        });

        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.id = 'date';
        dateInput.max = '2100-12-31';
        dateInput.min = '1997-12-31';

        dateInput.addEventListener('change',() => {
            date = dateInput.value;
        });

        const addtask = document.createElement('button');
        addtask.id = addtask;
        addtask.innerHTML = 'Add';
        
        taskform.appendChild(taskInput);
        taskform.appendChild(dateInput);
        taskform.appendChild(addtask);

        taskform.addEventListener('submit', (e) => {
            e.preventDefault();
        
            if (taskform.checkValidity()) {
                date = date.split('-').reverse().join('/');
                const task = new TaskElement(taskname,date);
                const taskDiv = task.task();
                tasks.appendChild(taskDiv);
            }
            else {
                taskform.reportValidity();
            }
        });

        container.appendChild(header);
        container.appendChild(tasks);
        container.appendChild(taskform);

        const section = document.querySelector('section');

        if (section.childElementCount == 0) {
            section.appendChild(container);
        } else {
            while (section.firstChild) {
                section.removeChild(section.firstChild);
            }
            section.appendChild(container);
        }
    } 
}

export { ProjectElement }