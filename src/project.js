import { TaskElement } from "./task";

class ProjectElement {
  constructor(name) {
    this.name = name;
    this.nameelement = null;
    this.projectelement = null;
    this.sectionelement = null;
  }
  project() {
    const project = document.createElement("div");
    project.classList = "project";
    project.appendChild(this.logo());

    /* this.projectname() is necessary to define this.nameelement */
    this.projectname();
    project.appendChild(this.nameelement);

    project.appendChild(this.edit());
    project.appendChild(this.remove());
    this.projectelement = project;
    this.projectelement.addEventListener("click", () => this.createsection());
    return project;
  }
  logo() {
    const logo = document.createElement("span");
    logo.classList = "logo projectlogo";
    return logo;
  }
  projectname() {
    const name = document.createElement("span");
    name.innerText = this.name;
    this.nameelement = name;
  }
  edit() {
    const edit = document.createElement("button");
    edit.classList = "logo projecteditnormal";

    let isEditing = false;

    const projectinput = document.createElement("input");
    projectinput.type = "text";
    projectinput.className = "projectedit";
    projectinput.addEventListener("change", () => {
      this.name = projectinput.value;
    });

    edit.addEventListener("click", () => {
      if (isEditing) {
        let oldname = this.nameelement.innerText;

        this.nameelement = document.createElement("div");
        this.nameelement.innerText = `${this.name}`;

        const projectDataString = localStorage.getItem(`${oldname}`);

        localStorage.removeItem(`${oldname}`);
        localStorage.setItem(`${this.name}`, projectDataString);

        this.projectelement.replaceChild(this.nameelement, projectinput);
        isEditing = false;
      } else {
        this.projectelement.replaceChild(projectinput, this.nameelement);
        isEditing = true;
      }
      edit.classList = isEditing
        ? "logo projecteditadd"
        : "logo projecteditnormal";
    });
    return edit;
  }
  remove() {
    const remove = document.createElement("button");
    remove.className = "logo projectremove";
    remove.addEventListener("click", (event) => {
      const projects = document.getElementById("projects");
      const section = document.querySelector("section");
      projects.removeChild(this.projectelement);
      section.innerText = "";

      localStorage.removeItem(this.name);
      event.stopPropagation();
    });
    return remove;
  }
  createsection() {
    const container = document.createElement("div");

    const header = document.createElement("header");
    header.innerText = `${this.name}`;

    const tasks = document.createElement("div");
    tasks.id = "tasks";

    const taskform = document.createElement("form");
    taskform.id = "taskform";

    let taskname;
    let date;

    const taskInput = document.createElement("input");
    taskInput.id = "taskname";
    taskInput.placeholder = "Task Name";
    taskInput.required = true;

    taskInput.addEventListener("change", () => {
      taskname = taskInput.value;
    });

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "date";
    dateInput.max = "2100-12-31";
    dateInput.min = "1997-12-31";

    dateInput.addEventListener("change", () => {
      date = dateInput.value;
    });

    const addtask = document.createElement("button");
    addtask.id = "addtask";
    addtask.innerText = "Add";

    taskform.appendChild(taskInput);
    taskform.appendChild(dateInput);
    taskform.appendChild(addtask);

    const projectDataString = localStorage.getItem(`${this.name}`);
    const projectData = JSON.parse(projectDataString);

    for (const task of projectData) {
      const taskName = task.name;
      const taskDate = task.date;
      const taskCheck = task.checked;

      const taskElement = new TaskElement(
        taskName,
        taskDate,
        taskCheck,
        this.name
      );
      const taskDiv = taskElement.task();
      tasks.appendChild(taskDiv);
    }

    taskform.addEventListener("submit", (e) => {
      e.preventDefault();

      if (taskform.checkValidity()) {
        let taskdate = date.split("-").reverse().join("/");

        const newTask = {
          name: taskname,
          date: taskdate,
          checked: false,
        };
        projectData.push(newTask);

        const updatedProjectDataString = JSON.stringify(projectData);
        localStorage.setItem(`${this.name}`, updatedProjectDataString);

        const taskElement = new TaskElement(
          taskname,
          taskdate,
          false,
          this.name
        );
        const taskDiv = taskElement.task();
        tasks.appendChild(taskDiv);
      } else {
        taskform.reportValidity();
      }
    });

    container.appendChild(header);
    container.appendChild(tasks);
    container.appendChild(taskform);

    const section = document.querySelector("section");

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

export { ProjectElement };
