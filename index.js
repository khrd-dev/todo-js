
//inputTodo = document.querySelector(".new-todo");
const task = { id: "1", text: "выучить html", completed: true };
const tasksList = [
/*     { id: "1", text: "выучить html", completed: true },
    { id: "2", text: "выучить css", completed: true },
    { id: "3", text: "выучить js", completed: false },
    { id: "4", text: "выучить фреймворк", completed: false },
    { id: "5", text: "написать несколько учебных проектов", completed: false },
    { id: "6", text: "пройти собеседование", completed: false },
    { id: "7", text: "получить работу", completed: false } */
    ];

const todoList = document.querySelector(".todo-list");
const newTodo = document.querySelector(".new-todo")

function renderTasks(arr) {
    /* for(let i = 0; i < arr.length; i++) {
        createListItem(arr[i]); // рисует весь массив сразу, и потом дублирует 
    } */                        //при добавлении новой задачи
    let idObject = arr.length - 1;
    createListItem(arr[idObject]); //рисует один таск
}

function getId() {
    let idValue = tasksList.length + 1;
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
