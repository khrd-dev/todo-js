
//inputTodo = document.querySelector(".new-todo");
const task = { id: "1", text: "выучить html", completed: true };
let tasksList = [
/*     { id: "1", text: "выучить html", completed: true },
    { id: "2", text: "выучить css", completed: true },
    { id: "3", text: "выучить js", completed: false },
    { id: "4", text: "выучить фреймворк", completed: false },
    { id: "5", text: "написать несколько учебных проектов", completed: false },
    { id: "6", text: "пройти собеседование", completed: false },
    { id: "7", text: "получить работу", completed: false } */
    ];
let tasksActive = [];
let tasksCompleted = [];

const todoList = document.querySelector(".todo-list");
const newTodo = document.querySelector(".new-todo");
const todoapp = document.querySelector(".todoapp");
const todoCount = document.querySelector(".todo-count");
const clearCompleted = document.querySelector(".clear-completed");

document.addEventListener("click", deleteTask);
document.addEventListener("click", toggleTask);
document.addEventListener("click", deleteComletedTasks);

/*function renderTasks(arr) {
    const idObject = arr.length - 1;
    createListItem(arr[idObject]);
}*/

function renderTasks(arr) {
    todoList.innerHTML = '';
    arr.forEach(element => {
        createListItem(element);
    });
}

function getId() {
    //let idValue = tasksList.length + 1;
    //let rand = 0.5 + Math.random() * 10000000
    let idValue = 0.5 + Math.random() * 1e17
    return idValue;
}

function createNewTask() {
    if (newTodo.value !== "") {
        let obj = {
        id : getId(), text : newTodo.value, completed : false
        };
    tasksList.push(obj);
    renderTasks(tasksList);
    newTodo.value = "";
    countActiveTasks();
    };
}

function createListItem(obj) {
    let li = document.createElement('li');
    li.id = obj.id;
    li.completed = obj.completed;
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
    countActiveTasks();
};

function toggleTask(event) {
    if (event.target.className != 'toggle') return;
    //event.target.completed = 'true';
    let nodeTask = event.target.closest("li");
    if (nodeTask.className !== 'completed') {
        nodeTask.className = 'completed';
        let idTask = +nodeTask.id;
        let delTask = tasksList.find(item => item.id == idTask);
        let posInTaskList = tasksList.findIndex(currentValue => currentValue == delTask);
        tasksList[posInTaskList].completed = true;
    } else {
        nodeTask.className = '';
        let idTask = +nodeTask.id;
        let delTask = tasksList.find(item => item.id == idTask);
        let posInTaskList = tasksList.findIndex(currentValue => currentValue == delTask);
        tasksList[posInTaskList].completed = false;
    };
    countActiveTasks();
}

function countActiveTasks() {
    tasksActive = tasksList.filter(item => item.completed == false);
    tasksCompleted = tasksList.filter(item => item.completed == true);
    let countAct = tasksActive.length;
    if (countAct !== 0) {
        todoCount.textContent = countAct + ' items left';
        todoCount.style.display = "block";
    } else todoCount.style.display = "none";
    checkClearCompleted();
}

function deleteComletedTasks(event) {
    if (event.target.className != 'clear-completed') return;
    tasksList = tasksActive;
    renderTasks(tasksList);
    tasksCompleted = [];
    checkClearCompleted();
}

function checkClearCompleted() {
    if (tasksCompleted.length !== 0) {
        clearCompleted.style.display = "block";
    } else {
        clearCompleted.style.display = "none";
    }
}