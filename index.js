
let tasksList = [];
let tasksActive = [];
let tasksCompleted = [];

const todoList = document.querySelector(".todo-list");
const newTodo = document.querySelector(".new-todo");
const todoapp = document.querySelector(".todoapp");
const todoCount = document.querySelector(".todo-count");
const clearCompleted = document.querySelector(".clear-completed");
const filtersTodo = document.querySelector(".filters");
const footerTodo = document.querySelector(".footer");
const footerTodoAll = document.getElementById('all');
const footerTodoActive = document.getElementById('active');
const footerTodoCompleted = document.getElementById('completed');

document.addEventListener("click", deleteTask);
document.addEventListener("click", toggleTask);
document.addEventListener("click", deleteComletedTasks);
document.addEventListener("click", filterTasks);

updateLocalStorage();
checkFilter();
countActiveTasks();

function renderTasks(arr) {
    todoList.innerHTML = '';
    arr.forEach(element => {
        createListItem(element);
    });
}

function getId() {
    let idValue = 0.5 + Math.random() * 1e17
    return idValue;
}

function createNewTask() {
    if (newTodo.value !== "") {
        let obj = {
        id : getId(), text : newTodo.value, completed : false
        };
    tasksList.push(obj);
    localStorage.tasksList = JSON.stringify(tasksList);
    renderTasks(tasksList);
    newTodo.value = "";
    countActiveTasks();
    };
}

function createListItem(obj) {
    let li = document.createElement('li');
    li.id = obj.id;
    li.completed = obj.completed;
    if (li.completed == true) li.classList.add("completed");
    todoList.append(li)
    let div = document.createElement('div');
    div.className = "view";
    li.append(div)
    let input = document.createElement('input');
    input.className = "toggle";
    input.type = "checkbox";
    input.checked = obj.completed;
    div.append(input);
    let label = document.createElement('label');
    label.textContent = obj.text;
    div.append(label);
    let button = document.createElement('button');
    button.className = "destroy";
    div.append(button);
};

function deleteTask(event) {
    if (event.target.className != 'destroy') return;
    let nodeTask = event.target.closest("li");
    let idTask = +nodeTask.id;
    nodeTask.remove();
    let delTask = tasksList.find(item => item.id == idTask);
    let posInTaskList = tasksList.findIndex(currentValue => currentValue == delTask);
    tasksList.splice(posInTaskList,1);
    localStorage.tasksList = JSON.stringify(tasksList);
    countActiveTasks();
};

function toggleTask(event) {
    if (event.target.className != 'toggle') return;
    let nodeTask = event.target.closest("li");
    if (nodeTask.className !== 'completed') {
        nodeTask.className = 'completed';
        let idTask = +nodeTask.id;
        let delTask = tasksList.find(item => item.id == idTask);
        let posInTaskList = tasksList.findIndex(currentValue => currentValue == delTask);
        tasksList[posInTaskList].completed = true;
        localStorage.tasksList = JSON.stringify(tasksList);
    } else {
        nodeTask.className = '';
        let idTask = +nodeTask.id;
        let delTask = tasksList.find(item => item.id == idTask);
        let posInTaskList = tasksList.findIndex(currentValue => currentValue == delTask);
        tasksList[posInTaskList].completed = false;
        localStorage.tasksList = JSON.stringify(tasksList);
    };
    countActiveTasks();
}

function countActiveTasks() {
    tasksActive = tasksList.filter(item => item.completed == false);
    localStorage.tasksActive = JSON.stringify(tasksActive);
    tasksCompleted = tasksList.filter(item => item.completed == true);
    localStorage.tasksCompleted = JSON.stringify(tasksCompleted);
    let countAct = tasksActive.length;
    if (countAct !== 0) {
        todoCount.textContent = countAct + ' items left';
        todoCount.style.display = "block";
    } else todoCount.style.display = "none";
    checkClearCompleted();
    checkFooter();
}

function deleteComletedTasks(event) {
    if (event.target.className !== 'clear-completed') return;
    tasksList = tasksActive;
    localStorage.tasksList = JSON.stringify(tasksList);
    renderTasks(tasksList);
    tasksCompleted = [];
    checkClearCompleted();
    checkFooter();
}

function checkClearCompleted() {
    if (tasksCompleted.length !== 0) {
        clearCompleted.style.display = "block";
    } else {
        clearCompleted.style.display = "none";
    }
}

function filterTasks(event) {
    let lnk = event.target.id;
    let firstLi = filtersTodo.firstElementChild;
    let nextLi = firstLi.nextElementSibling;
    let lastLi = filtersTodo.lastElementChild;
    switch(lnk) {
        case 'all':
            if (event.target.className == 'selected') break;
            firstLi.firstElementChild.classList.remove("selected");
            nextLi.firstElementChild.classList.remove("selected");
            lastLi.lastElementChild.classList.remove("selected");
            firstLi.firstElementChild.classList.add("all");
            nextLi.firstElementChild.classList.add("active");
            lastLi.lastElementChild.classList.add("completed");
            event.target.classList.add('selected');
            renderTasks(tasksList);
            break;
        case 'active':
            if (event.target.className == 'selected') break;
            firstLi.firstElementChild.classList.remove("selected");
            nextLi.firstElementChild.classList.remove("selected");
            lastLi.lastElementChild.classList.remove("selected");
            firstLi.firstElementChild.classList.add("all");
            nextLi.firstElementChild.classList.add("active");
            lastLi.lastElementChild.classList.add("completed");
            event.target.classList.add('selected');
            renderTasks(tasksActive);
            break;
        case 'completed':
            firstLi.firstElementChild.classList.remove("selected");
            nextLi.firstElementChild.classList.remove("selected");
            lastLi.lastElementChild.classList.remove("selected");
            firstLi.firstElementChild.classList.add("all");
            nextLi.firstElementChild.classList.add("active");
            lastLi.lastElementChild.classList.add("completed");
            event.target.classList.add('selected');
            renderTasks(tasksCompleted);
            break;
    }
}

function checkFooter() {
    if (tasksList.length == 0) {
        footerTodo.style.display = "none";
    } else {
        footerTodo.style.display = "block";
    }
}

function updateLocalStorage() {
    tasksList = JSON.parse(localStorage.tasksList);
    tasksCompleted = JSON.parse(localStorage.tasksCompleted);
    tasksActive = JSON.parse(localStorage.tasksActive);
}

function checkFilter() {
    let currentLocation = window.location.hash;
    switch(currentLocation) {
        case '#/':
            renderTasks(tasksList);
            break;
        case '#/active':
            renderTasks(tasksActive);
            footerTodoAll.classList.remove("selected");
            footerTodoActive.classList.add("selected");
            break;
        case '#/completed':
            renderTasks(tasksCompleted);
            footerTodoAll.classList.remove("selected");
            footerTodoCompleted.classList.add("selected");
            break;
    }
}