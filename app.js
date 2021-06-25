// define UI variables 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners 
loadEventListeners();

// load all event listeners function
function loadEventListeners(){
    // DOM load event 
    document.addEventListener('DOMContentLoaded', getTasks)
    //add task event 
    form.addEventListener('submit', addTask);
    //remove task event 
    taskList.addEventListener('click',removeTask);
    //clear tasks 
    clearBtn.addEventListener('click', clearTask);
    // filter task
    filter.addEventListener('keyup',filterTask);
    
}

// get tasks, being presisted to local storage.
// each time a refresh is done, added task will remain until clear button is pressed.

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    } else {
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
    // create li
    const li = document.createElement('li');

    // add a class
    li.className = 'collection-item';

    //create text node and append to li 
    li.appendChild(document.createTextNode(task));

    // make a new link
    const link = document.createElement('a');

    //add a class
    link.className = 'delete-item secondary-content';

    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);;

    });
}

//add task
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // create li
    const li = document.createElement('li');

    // add a class
    li.className = 'collection-item';

    //create text node and append to li 
    li.appendChild(document.createTextNode(taskInput.value));

    // make a new link
    const link = document.createElement('a');

    //add a class
    link.className = 'delete-item secondary-content';

    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // store in ls
    storeTaskinLS(taskInput.value);

    //clear input 
    taskInput.value = '';

e.preventDefault();
}

// store task 
function storeTaskinLS(task){
    let tasks;
    if (localStorage.getItem('tasks') === null ){
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm ('Are you sure?')) {
        e.target.parentElement.parentElement.remove();

            // remove from the ls
            removeTaskfromls(e.targer.parentElement.parentElement)

        }
    }
}

    // remove from ls 
    function removeFromls(taskItem){
        let tasks;
        if(localStorage.getitem('tasks')=== null){
            tasks =[];

        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task, index){
            if(taskItem.textContent == task){
                tasks.splice(index,1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

// clear tasks 
function clearTask(){
    //can be done this way too 
    //taskList.innerHTML = '';

    //faster 
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);

    }
    // clear from ls

    clearTasksfromLS();
}
// clear ls function 

function clearTasksfromLS(){
    localStorage.clear();
}

// filter task

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    //querySelectorAll returns a node list hence the use of forEach
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
            }
        });
}