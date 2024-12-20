document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
  

    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };
  
    const saveTasks = () => {
      const tasks = [];
      document.querySelectorAll('#task-list li').forEach(item => {
        tasks.push({
          text: item.querySelector('span').textContent,
          completed: item.classList.contains('completed')
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    const addTaskToDOM = (text, completed = false) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = text;
      if (completed) li.classList.add('completed');
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = completed;
      checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        saveTasks();
      });
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        const newText = prompt('Edit your task:', span.textContent);
        if (newText) {
          span.textContent = newText;
          saveTasks();
        }
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
      });
  
      li.append(checkbox, span, editButton, deleteButton);
      taskList.appendChild(li);
      saveTasks();
    };
  
    addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (!taskText) {
        alert('Task cannot be empty!');
        return;
      }
      addTaskToDOM(taskText);
      taskInput.value = '';
    });
  
    loadTasks();
  });
  