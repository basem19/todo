let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasksDiv = document.querySelector('.tasks');
let messageBox = document.getElementById('messageBox');

let tasksArray = JSON.parse(window.localStorage.getItem('tasks')) || [];

function renderTasks() {
   tasksDiv.innerHTML = '';
   tasksArray.forEach(task => {
      let taskDiv = document.createElement('div');
      taskDiv.className = 'task' + (task.completed ? ' done' : '');
      taskDiv.setAttribute('id', task.id);
      taskDiv.innerHTML = `
         <h4>${task.title}</h4>
         <div>
            <span class="doneBtn" data-id="${task.id}"><i class="fas fa-check"></i> Complete</span>
            <span class="delete" data-id="${task.id}"><i class="fas fa-trash-alt"></i> Delete</span>
         </div>`;
      tasksDiv.appendChild(taskDiv);
   });
}

function showMessage(message, iconClass) {
   document.getElementById('messageIcon').innerHTML = `<i class="${iconClass}"></i>`;
   document.getElementById('messageText').innerText = message;
   messageBox.classList.add('show');
   setTimeout(() => {
      messageBox.classList.remove('show');
   }, 3000);
}

submit.onclick = function () {
   if (input.value.trim() !== "") {
      let taskObj = {
         id: Date.now(),
         title: input.value.trim(),
         completed: false
      };
      tasksArray.push(taskObj);
      window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
      renderTasks();
      input.value = '';
      showMessage('Task added successfully!', 'fas fa-check-circle');
   } else {
      showMessage('Please enter a task before adding!', 'fas fa-exclamation-circle');
   }
};

tasksDiv.addEventListener('click', (e) => {
   const taskId = e.target.getAttribute('data-id'); 
   if (e.target.classList.contains('delete')) {
      tasksArray = tasksArray.filter(task => task.id != taskId);
      window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
      renderTasks();
      showMessage('Task deleted successfully!', 'fas fa-trash-alt');
   }
   if (e.target.classList.contains('doneBtn')) {
      const task = tasksArray.find(task => task.id == taskId);
      if (task) {
         task.completed = !task.completed;
         window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
         renderTasks();
         showMessage(task.completed ? 'Task completed!' : 'Task marked incomplete!', 'fas fa-check');
      }
   }
});

renderTasks();
