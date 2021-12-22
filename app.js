// Variable Declarations | Selectors!
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners!
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
    // Preventing Form from Submitting! 
    event.preventDefault();
    
    // Creating todo DIV element!
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Creating the LI element!
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Add todo to the local storage!
    saveLocalTodos(todoInput.value);

    // Check-mark Button!
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('complete-button');
    todoDiv.appendChild(completedButton);
    
    // Trash Button!
    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton);

    // Appending to 'todoList'!
    todoList.appendChild(todoDiv);

    // Clearing todoInput values!
    todoInput.value = '';
};

// Trash && Check btn Function!
function deleteCheck(e) {
    const item = e.target;

    // Deleting todo list with the trash-button!
    if (item.classList[0] === 'trash-button') {
        const todo = item.parentElement;
        // Animation!
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    // Check Button!
    if (item.classList[0] === 'complete-button') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
};

// Assigning functionality to the 'select' filter!
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        // !
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        };
    });
};

// Implementing the local storage!
function saveLocalTodos(todo) {
    // !
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

// !
function getTodos() {
    // !
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // Creating todo DIV element!
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Creating the LI element!
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Check-mark Button!
        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add('complete-button');
        todoDiv.appendChild(completedButton);
        
        // Trash Button!
        const trashButton = document.createElement('button');
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add('trash-button');
        todoDiv.appendChild(trashButton);

        // Appending to 'todoList'!
        todoList.appendChild(todoDiv);
    });
};

// !
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
};