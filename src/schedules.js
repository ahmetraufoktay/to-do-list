import { TaskElement } from "./task";

const section = document.querySelector('section');

const finish = document.createElement('div');
finish.className = 'schedule';

const logo = document.createElement('span');
logo.innerHTML = 'logo';

const finishName = document.createElement('span');
finishName.innerHTML = 'Completed Tasks';

const finishCount = document.createElement('span');
finishCount.id = 'finischount';

finish.appendChild(logo);
finish.appendChild(finishName);
finish.appendChild(finishCount);

finish.addEventListener('click', ()=> {
    section.innerHTML = '';
    const container = document.createElement('div');
    const header = document.createElement('header');
    header.innerHTML = 'Completed Tasks';

    const tasks = document.createElement('div');
    tasks.id = 'tasks';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const tasksString = localStorage.getItem(key);
        const taskList = JSON.parse(tasksString);
        for (const task of taskList) {
            if (task['checked']) {
                const taskElement = new TaskElement(task['name'], task['date'], task['checked'],key);
                const taskDiv = taskElement.task();
                tasks.appendChild(taskDiv);
            }
        }
    }

    container.appendChild(header);
    container.appendChild(tasks);
    section.appendChild(container);
})

export { finish };