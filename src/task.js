class TaskElement {
  constructor(name, date, checked = false, parent) {
    this.name = name;
    this.date = date;
    this.checked = checked;
    this.parent = parent;
    this.nameelement = null;
    this.dateelement = null;
    this.taskelement = null;
  }
  task() {
    const task = document.createElement("div");
    task.className = "task";
    this.taskname();
    this.datename();
    task.appendChild(this.checkbox());
    task.appendChild(this.nameelement);
    task.appendChild(this.dateelement);
    task.appendChild(this.edit());
    task.appendChild(this.remove());
    this.taskelement = task;
    return task;
  }
  checkbox() {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";

    const projectDataString = localStorage.getItem(`${this.parent}`);
    const projectData = JSON.parse(projectDataString);
    const item = projectData.find((element) => element.name == this.name);

    checkBox.checked = item["checked"];
    checkBox.addEventListener("click", () => {
      this.checked = !this.checked;

      item["checked"] = this.checked;
      const updatedProjectDataString = JSON.stringify(projectData);
      localStorage.setItem(`${this.parent}`, updatedProjectDataString);
    });
    return checkBox;
  }
  taskname() {
    const name = document.createElement("div");
    name.innerText = this.name;
    this.nameelement = name;
  }
  datename() {
    const date = document.createElement("div");
    date.innerText = this.date;
    this.dateelement = date;
  }
  edit() {
    const edit = document.createElement("button");
    edit.classList = "logo taskeditnormal";

    let isEditing = false;

    const dateinput = document.createElement("input");
    dateinput.type = "date";
    dateinput.className = "dateedit";
    dateinput.required = true;
    dateinput.addEventListener("change", () => {
      this.date = dateinput.value;
    });

    const taskinput = document.createElement("input");
    taskinput.type = "text";
    taskinput.className = "taskedit";
    taskinput.required = true;
    taskinput.addEventListener("change", () => {
      this.name = taskinput.value;
    });

    let oldname;
    edit.addEventListener("click", () => {
      if (isEditing) {
        this.dateelement = document.createElement("div");
        this.dateelement.innerText = `${this.date
          .split("-")
          .reverse()
          .join("/")}`;

        this.nameelement = document.createElement("div");
        this.nameelement.innerText = `${this.name}`;

        this.taskelement.replaceChild(this.dateelement, dateinput);
        this.taskelement.replaceChild(this.nameelement, taskinput);

        const projectDataString = localStorage.getItem(`${this.parent}`);
        const projectData = JSON.parse(projectDataString);
        const item = projectData.find((element) => element.name == oldname);
        item["name"] = `${this.name}`;
        item["date"] = `${this.date.split("-").reverse().join("/")}`;
        const updatedProjectDataString = JSON.stringify(projectData);
        localStorage.setItem(`${this.parent}`, updatedProjectDataString);

        isEditing = false;
      } else {
        oldname = this.name;
        this.taskelement.replaceChild(dateinput, this.dateelement);
        this.taskelement.replaceChild(taskinput, this.nameelement);
        isEditing = true;
      }
      edit.classList = isEditing ? "logo taskeditadd" : "logo taskeditnormal";
    });
    return edit;
  }
  remove() {
    const remove = document.createElement("button");
    remove.classList = "logo taskremove";
    remove.addEventListener("click", () => {
      const tasks = document.getElementById("tasks");
      tasks.removeChild(this.taskelement);

      const projectDataString = localStorage.getItem(`${this.parent}`);
      const projectData = JSON.parse(projectDataString);
      const item = projectData.find((element) => element.name == this.name);
      projectData.pop(item);
      const updatedProjectDataString = JSON.stringify(projectData);
      localStorage.setItem(`${this.parent}`, updatedProjectDataString);
    });
    return remove;
  }
}

export { TaskElement };
