import './style.css';
import { TaskElement } from './task';

const taskInput = document.getElementById('taskname');
const dateInput = document.getElementById('date');
let taskname;
let date;
taskInput.addEventListener('change',() => {
    taskname = taskInput.value;
});
dateInput.addEventListener('change',() => {
    date = dateInput.value;
});

const addtask = document.getElementById('addtask');
const taskform = document.getElementById('taskform');

const tasks = document.getElementById('tasks');

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

