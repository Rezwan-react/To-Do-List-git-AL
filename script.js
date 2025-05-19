const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

function createTodoItem(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = text;

    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTodo(li, span);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => li.remove();

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    return li;
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        const todoItem = createTodoItem(text);
        todoList.appendChild(todoItem);
        todoInput.value = '';
    }
}

function editTodo(li, span) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;
    input.className = 'todo-edit-input';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.onclick = () => {
        if (input.value.trim()) {
            span.textContent = input.value.trim();
            li.replaceChild(span, input);
            li.querySelector('.todo-actions').replaceChild(editBtn, saveBtn);
        }
    };

    const editBtn = li.querySelector('.todo-actions button:first-child');
    li.replaceChild(input, span);
    li.querySelector('.todo-actions').replaceChild(saveBtn, editBtn);

    input.focus();
    input.onkeydown = (e) => {
        if (e.key === 'Enter') saveBtn.onclick();
    };
}

addBtn.onclick = addTodo;
todoInput.onkeydown = (e) => {
    if (e.key === 'Enter') addTodo();
};