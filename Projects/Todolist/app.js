// Selectors
const todoInput = document.querySelector('.text-input');
const todoList = document.querySelector('.todo-list');
const todoButton = document.querySelector('.btn-add');
const emptyText = document.querySelector('.empty-text');
const filterOption = document.querySelector('.filter-todo');
const clearButton = document.querySelector('.clear-all');

filterOption.disabled = true;
clearButton.disabled = true;

//Listeners
window.addEventListener('load', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
clearButton.addEventListener('click', clearAll);
//Functions

function addTodo(event) {
    event.preventDefault();

    if (todoInput.value != "") {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Add Todo to local storage
        saveLocalTodos(todoInput.value);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);

        todoInput.value = "";
        filterOption.disabled = false;
        clearButton.disabled = false;
    }

    if (todoList.getElementsByClassName("todo-item").length > 0) {
        const text = todoList.firstElementChild;
        if (text.classList[0] == "empty-text") {
            text.remove();
        }
    }
    
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] == "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }

    if (item.classList[0] == "trash-btn") {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();

        if (todoList.getElementsByClassName("todo-item").length < 1) {
            const text = document.createElement('p');
            text.innerText = "Add a New Task";
            text.classList.add('empty-text');
            todoList.appendChild(text);
            
            clearButton.disabled = true;
            filterOption.disabled = true;
        }

    }    
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        //check for undefined values and skips then and only apply the switch statement on nodes with properties 
        if (todo.classList !== undefined) {
            switch (e.target.value) {
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                break;
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        }
        return;
        });
}

function clearAll() {
    const todos = todoList.childNodes;
    todoList.innerHTML = '';

    localStorage.clear();

    if (todoList.getElementsByClassName("todo-item").length < 1) {
        const text = document.createElement('p');
        text.innerText = "Add a New Task";
        text.classList.add('empty-text');
        todoList.appendChild(text);

        filterOption.disabled = true;
        clearButton.disabled = true;
    }
}

function saveLocalTodos(todo) {
    //Check
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    //Check
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        if (localStorage.getItem('todos') == "[]") {
            clearButton.disabled = true;
        } else {
            clearButton.disabled = false;
        }
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);

        if (todoList.getElementsByClassName("todo-item").length > 0) {
            const text = todoList.firstElementChild;
            if (text.classList[0] == "empty-text") {
                text.remove();
            }
        }
    }));
}

function removeLocalTodos(todo) {
    //Check
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}
