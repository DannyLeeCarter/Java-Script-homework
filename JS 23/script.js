document.addEventListener('DOMContentLoaded', function () {
  const todoForm = document.createElement('form');
  todoForm.id = 'todo-form';

  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.id = 'task-input';
  taskInput.placeholder = 'Task name';
  taskInput.required = true;

  const addTaskButton = document.createElement('input');
  addTaskButton.type = 'submit';
  addTaskButton.value = 'Add Task';

  todoForm.appendChild(taskInput);
  todoForm.appendChild(addTaskButton);

  const filterButtons = document.createElement('div');
  filterButtons.id = 'filter-buttons';

  const allButton = document.createElement('button');
  allButton.id = 'all-btn';
  allButton.textContent = 'All';
  allButton.classList.add('active');

  const activeButton = document.createElement('button');
  activeButton.id = 'active-btn';
  activeButton.textContent = 'Active';

  const completedButton = document.createElement('button');
  completedButton.id = 'completed-btn';
  completedButton.textContent = 'Completed';

  filterButtons.appendChild(allButton);
  filterButtons.appendChild(activeButton);
  filterButtons.appendChild(completedButton);

  const todoList = document.createElement('ul');
  todoList.id = 'todo-list';

  const container = document.createElement('div');
  container.appendChild(todoForm);
  container.appendChild(filterButtons);
  container.appendChild(todoList);

  document.body.appendChild(container);

  const form = document.getElementById('todo-form');
  const todoListEl = document.getElementById('todo-list');
  const allBtn = document.getElementById('all-btn');
  const activeBtn = document.getElementById('active-btn');
  const completedBtn = document.getElementById('completed-btn');

  // Load todo items from storage or set an empty array
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  // Function to save the todos to localStorage
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Function to render the todo items on the page
  function renderTodos() {
    todoListEl.innerHTML = '';

    todos.forEach(function (todo, index) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="task ${todo.completed ? 'completed' : ''}">${todo.task}</span>
        <input class="edit-input" type="text" value="${todo.task}">
        <div class="edit-buttons">
          <button class="complete-btn">Complete</button>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;

      const taskSpan = li.querySelector('.task');
      const editInput = li.querySelector('.edit-input');
      const completeBtn = li.querySelector('.complete-btn');
      const editBtn = li.querySelector('.edit-btn');
      const deleteBtn = li.querySelector('.delete-btn');

      // Toggle completion status
      completeBtn.addEventListener('click', function () {
        todo.completed = !todo.completed;
        taskSpan.classList.toggle('completed');
        saveTodos();
      });

      // Show/hide edit input
      editBtn.addEventListener('click', function () {
        taskSpan.style.display = 'none';
        editInput.style.display = 'block';
        editInput.focus();
      });

      // Update task name
      editInput.addEventListener('blur', function () {
        const newTask = editInput.value.trim();

        if (newTask !== '') {
          todo.task = newTask;
          taskSpan.textContent = newTask;
          saveTodos();
        } else {
          editInput.value = todo.task;
        }

        taskSpan.style.display = 'inline';
        editInput.style.display = 'none';
      });

      // Delete todo item
      deleteBtn.addEventListener('click', function () {
        todos.splice(index, 1);
        li.remove();
        saveTodos();
      });

      todoListEl.appendChild(li);
    });
  }

  // Add new todo item
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const task = taskInput.value.trim();

    if (task !== '') {
      const newTodo = {
        task: task,
        completed: false,
      };

      todos.push(newTodo);
      saveTodos();
      taskInput.value = '';
      renderTodos();
    }
  });

  // Filter buttons functionality
  allBtn.addEventListener('click', function () {
    allBtn.classList.add('active');
    activeBtn.classList.remove('active');
    completedBtn.classList.remove('active');
    renderTodos();
  });

  activeBtn.addEventListener('click', function () {
    allBtn.classList.remove('active');
    activeBtn.classList.add('active');
    completedBtn.classList.remove('active');

    const activeTodos = todos.filter(function (todo) {
      return !todo.completed;
    });

    todoListEl.innerHTML = '';
    activeTodos.forEach(function (todo) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="task">${todo.task}</span>
        <input class="edit-input" type="text" value="${todo.task}">
        <div class="edit-buttons">
          <button class="complete-btn">Complete</button>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      todoListEl.appendChild(li);
    });
  });

  completedBtn.addEventListener('click', function () {
    allBtn.classList.remove('active');
    activeBtn.classList.remove('active');
    completedBtn.classList.add('active');

    const completedTodos = todos.filter(function (todo) {
      return todo.completed;
    });

    todoListEl.innerHTML = '';
    completedTodos.forEach(function (todo) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="task completed">${todo.task}</span>
        <input class="edit-input" type="text" value="${todo.task}">
        <div class="edit-buttons">
          <button class="complete-btn">Complete</button>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      todoListEl.appendChild(li);
    });
  });

  // Initial rendering of todos
  renderTodos();
});
