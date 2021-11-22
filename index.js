
//inputTodo = document.querySelector(".new-todo");
const task = { id: "1", text: "выучить html", completed: true };
const todoList = document.querySelector(".todo-list");
/*
function renderTask(newObject) {
    createListItem(newObject);
    todoList.append(li);
    li.append(div);
    div.append(input);
    div.append(label);
    div.append(button);
 
}*/

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
    div.append(input);
    let label = document.createElement('label');
    label.textContent = obj.text;
    div.append(label);
    let button = document.createElement('button');
    button.className = "destroy";
    div.append(button);
}
createListItem(task);