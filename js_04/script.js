const addbtn = document.getElementById('addbtn');
const updatebtn = document.getElementsByClassName('updatebtn');
const deletebtn = document.getElementsByClassName('deletebtn');




addbtn.addEventListener('click', () => {
    const task = document.getElementById('task').value;
    const ddate = document.getElementById('ddate').value;
    if(!task || !ddate){
        alert('Please fill in all fields');
        return;
    } 
    addtask(task, ddate);
});

function addtask(task, ddate) {     
    const taskobj = {
        Text : task,
        date : ddate
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskobj);
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    pageReload();  
    displayTasks();
}

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const container = document.getElementById('containerbody');
    container.innerHTML = '';

    tasks.forEach(task => {
        const newdiv = document.createElement('div');
        newdiv.className = 'task';
        newdiv.innerHTML = `
                <input type="checkbox" id="checkbox-${tasks.indexOf(task)}">
            <p data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">${task.Text}</p>
            <span class="date">${task.date}</span>
            <button class="updatebtn" onclick="editTask(${tasks.indexOf(task)})"> Update task</button>
            <button class="deletebtn" onclick="deleteTask(${tasks.indexOf(task)})">X</button>
        `;
        container.appendChild(newdiv);
    });
}

displayTasks();

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) { 
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];
    const newTask = document.getElementById('task').value;
    const newDate = document.getElementById('ddate').value;
    console.log(newTask, newDate);
    if(newTask && newDate){
        task.Text = newTask;
        task.date = newDate;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

 const container = document.getElementById('containerbody');
 container.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
        completed(event.target);
    }
});

function completed(checkbox) {
    const taskElement = checkbox.parentElement;
    if (checkbox.checked) {
        console.log("rafay");
        taskElement.classList.add('completed');
    } else {
        taskElement.classList.remove('completed');
    }   
}
function pageReload() {
    location.reload();
}

