class TaskElement {
    constructor(name,date) {
        this.name = name;
        this.date = date;
        this.checked  = false;
        this.nameelement = null;
        this.dateelement = null;
        this.taskelement = null;
    }
    task() {
        const task = document.createElement('div');
        task.className = 'task';
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
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.addEventListener('click',()=>{
            this.checked = !this.checked;
        })
        return checkBox;
    }
    taskname() {
        const name = document.createElement('div');
        name.innerHTML = this.name;
        this.nameelement = name;
    }
    datename() {
        const date = document.createElement('div');
        date.innerHTML = this.date;
        this.dateelement = date; 
    }
    edit() {
        const edit = document.createElement('button');
        edit.innerHTML = '|';

        let isEditing = false;

        const dateinput = document.createElement('input');
        dateinput.type = 'date';
        dateinput.className = 'dateedit';
        dateinput.addEventListener('change',() => {
            this.date = dateinput.value;
        })

        const taskinput = document.createElement('input');
        taskinput.type = 'text';
        taskinput.className = 'taskedit';
        taskinput.addEventListener('change',() => {
            this.name = taskinput.value;
        })

        edit.addEventListener('click',()=> {
            if (isEditing) {
                this.dateelement = document.createElement('div');
                this.dateelement.innerHTML = `${this.date.split('-').reverse().join('/')}`;
                
                this.nameelement = document.createElement('div');
                this.nameelement.innerHTML = `${this.name}`;
    
                this.taskelement.replaceChild(this.dateelement,dateinput);
                this.taskelement.replaceChild(this.nameelement,taskinput);
                isEditing = false;
            } else {
                this.taskelement.replaceChild(dateinput,this.dateelement);
                this.taskelement.replaceChild(taskinput,this.nameelement);
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
            const tasks = document.getElementById('tasks');
            tasks.removeChild(this.taskelement);
        })
        return remove;
    }
}

export { TaskElement };