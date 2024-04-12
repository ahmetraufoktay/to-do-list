import { TaskElement } from "./task";
import { compareAsc, addDays, isToday, format } from "date-fns";

const section = document.querySelector('section');
const container = document.createElement('div');
const header = document.createElement('header');
const tasks = document.createElement('div');
tasks.id = 'tasks';

function resetSection() {
    section.innerHTML = '';
    container.innerHTML = '';
    header.innerHTML = '';
    tasks.innerHTML = '';
}

function scanLocalStorage(keyword,condition,tasksDiv) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const tasksString = localStorage.getItem(key);
        const taskList = JSON.parse(tasksString);
        for (const task of taskList) {
            if (task[keyword] == condition) {
                const taskElement = new TaskElement(task['name'], task['date'], task['checked'],key);
                const taskDiv = taskElement.task();
                tasksDiv.appendChild(taskDiv);
            }
        }
    }
}

const currentDate = format(Date(),"dd/MM/yyyy");
const tomorrowDate = format(addDays(Date(),1),"dd/MM/yyyy");
const weekDate = addDays(Date(),7);

const today = document.getElementById('today');
const tomorrow = document.getElementById('tomorrow');
const thisweek = document.getElementById('thisweek');
const upcoming = document.getElementById('upcoming');
const finish = document.getElementById('completedtasks');

finish.addEventListener('click', () => {
    resetSection();
    header.innerHTML = 'Completed Tasks';

    scanLocalStorage('checked',true,tasks);
    console.log(currentDate);
    container.appendChild(header);
    container.appendChild(tasks);
    section.appendChild(container);
});

today.addEventListener('click', () => {
    resetSection();
    header.innerHTML = 'Tasks Due Today';

    scanLocalStorage('date',currentDate,tasks);

    console.log(currentDate);
    container.appendChild(header);
    container.appendChild(tasks);
    section.appendChild(container);
});

tomorrow.addEventListener('click', () => {
    resetSection();
    header.innerHTML = 'Tasks Due Tomorrow';

    scanLocalStorage('date',tomorrowDate,tasks)
    console.log(tomorrowDate);
    container.appendChild(header);
    container.appendChild(tasks);
    section.appendChild(container);
});

thisweek.addEventListener('click', () => {
    resetSection();
    header.innerHTML = 'Tasks Until This Week';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const tasksString = localStorage.getItem(key);
        const taskList = JSON.parse(tasksString);
        for (const task of taskList) {
            const dateParts = task['date'].split('/');
            const fixedDate = new Date(dateParts[2],dateParts[1]-1,dateParts[0]);
            if (compareAsc(weekDate,fixedDate) == 1 && compareAsc(fixedDate,Date()) == 1 || isToday(fixedDate)) {
                const taskElement = new TaskElement(task['name'], task['date'], task['checked'],key);
                const taskDiv = taskElement.task();
                tasks.appendChild(taskDiv);
            }
        }
    }
    container.appendChild(header);
    container.appendChild(tasks);
    section.appendChild(container);
});

upcoming.addEventListener('click', () => {
    resetSection();
    header.innerHTML = 'Upcoming Tasks';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const tasksString = localStorage.getItem(key);
        const taskList = JSON.parse(tasksString);
        for (const task of taskList) {
            const dateParts = task['date'].split('/');
            const fixedDate = new Date(dateParts[2],dateParts[1]-1,dateParts[0]);
            if (compareAsc(fixedDate,Date()) == 1 && !isToday(fixedDate)) {
                const taskElement = new TaskElement(task['name'], task['date'], task['checked'],key);
                const taskDiv = taskElement.task();
                tasks.appendChild(taskDiv);
            }
        }
    }
    container.appendChild(header);
    container.appendChild(tasks);
    section.appendChild(container);
});