// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-tasks")
const filter = document.querySelector("#filter")
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener("DOMContentLoaded", getTasks)
    // add task event
    form.addEventListener('submit', addTask)
    // remove task event
    taskList.addEventListener('click', removeTask)
    // clear task event
    clearBtn.addEventListener('click', clearTasks)
    // filter event
    filter.addEventListener('keyup', filterTasks)
    
}
// get tasks from Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        // create li element
    const li = document.createElement('li')
    // add class
    li.className = 'collection-item'
    // create text node and append to li
    li.appendChild(document.createTextNode(task))
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content'
    // add icon html
    link.innerHTML = '<i class="fas fa-times"></i>'
    // append link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
    })
}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Please add a task')
    }
    // create li element
    const li = document.createElement('li')
    // add class
    li.className = 'collection-item'
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content'
    // add icon html
    link.innerHTML = '<i class="fas fa-times"></i>'
    // append link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
    // store task in local storage
    storeInLocalStorage(taskInput.value)
    // clear input
    taskInput.value = ''

    e.preventDefault();
}

function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure you want to delete this task?")){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement.innerText);

        }
    }
}

function removeTaskFromLocalStorage(taskItem){
    console.log(taskItem)
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task, index){
        if(taskItem === task){
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// clear tasks
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    // clear tasks from localStorage
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear
}

// filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase()

    document.querySelectorAll('.collection-item').forEach((task)=>{
        const item = task.firstChild.textContent;
        // i think you could use .includes(text) here as well
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
}