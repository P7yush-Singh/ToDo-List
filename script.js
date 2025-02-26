document.querySelector('#addTaskButton').addEventListener('click', addTask);
document.addEventListener("DOMContentLoaded", loadTasks)

function addTask() {
    const taskInput = document.getElementById('textInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = taskText;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        const newTaskText = prompt('Edit your task:', li.firstChild.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            li.firstChild.textContent = newTaskText.trim();
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(li);
    });

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = '';
    updateLocalStorage()
}

function updateLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = [];
    for (let i = 0; i < taskList.children.length; i++) {
        tasks.push(taskList.children[i].firstChild.textContent);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    tasks.forEach(taskText => {
        const li = document.createElement('li');
        li.textContent = taskText;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            const newTaskText = prompt('Edit your task:', li.firstChild.textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                li.firstChild.textContent = newTaskText.trim();
                updateLocalStorage();
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
            updateLocalStorage();
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('ul');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});