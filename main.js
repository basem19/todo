let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasksDiv = document.querySelector('.tasks');
let messageBox = document.getElementById('messageBox');

let tasksArray = JSON.parse(window.localStorage.getItem('tasks')) || [];

function renderTasks() {
   tasksDiv.innerHTML = '';
   tasksArray.forEach(task => {
      let taskDiv = document.createElement('div');
      taskDiv.className = 'task' + (task.completed ? ' done' : ''); // إضافة "done" إذا كانت المهمة مكتملة
      taskDiv.setAttribute('id', task.id);
      taskDiv.innerHTML = `<h4>${task.title}</h4>
            <span class="doneBtn"><i class="fas fa-check"></i> Complete</span>
            <span class="delete"><i class="fas fa-trash-alt"></i> Delete</span>`;
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
      showMessage('Task added successfully!', 'fas fa-check-circle'); // أيقونة إيجابية
   } else {
      showMessage('Please enter a task before adding!', 'fas fa-exclamation-circle'); // أيقونة تحذيرية
   }
};

tasksDiv.addEventListener('click', (e) => {
   if (e.target.classList.contains('delete')) {
      tasksArray = tasksArray.filter(task => task.id != e.target.parentElement.id);
      window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
      renderTasks();
      showMessage('Task deleted successfully!', 'fas fa-trash-alt'); // أيقونة الحذف
   }
   if (e.target.classList.contains('doneBtn')) {
      const taskId = e.target.parentElement.id; // الحصول على ID المهمة
      const task = tasksArray.find(task => task.id == taskId);
      if (task) {
         task.completed = !task.completed; // تغيير حالة الإنجاز
         window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
         renderTasks(); // إعادة عرض المهام بعد التعديل
         showMessage('Task completed!', 'fas fa-check'); // أيقونة التحفيز
      }
   }
});

// تحميل المهام عند تحميل الصفحة
renderTasks();