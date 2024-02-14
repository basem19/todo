let input = document.querySelector('.input')
let submit = document.querySelector('.add')
let tasksDiv = document.querySelector('.tasks')

let tasksArray = []

if (window.localStorage.getItem('tasks')) {
   tasksArray = JSON.parse(window.localStorage.getItem('tasks'))
}
gitDataLocalStorage()


tasksDiv.addEventListener('click', (e) => {
   if (e.target.classList.contains('delete')) {
      deleteTask(e.target.parentElement.getAttribute('id'))
      e.target.parentElement.remove()
   }

   if (e.target.classList.contains('doneBtn')) {
      toggleStats(e.target.parentElement.getAttribute('id'))
      e.target.parentElement.classList.toggle('done')
   }
})


submit.onclick = function () {
   if (input.value !== "") {
      addArray(input.value)
      input.value = ''
   }
}

function addArray(tasksText) {
   let taskOj = {
      id: Date.now(),
      title: tasksText,
      stats: false,
   };
   tasksArray.push(taskOj)
   addElement(tasksArray)
   addDataLocalStorage(tasksArray)
}

function addElement(tasksArray) {
   tasksDiv.innerHTML = "";
   tasksArray.forEach((taskOj) => {
      let div = document.createElement('div')
      div.id = taskOj.id
      div.className = 'task'
      if (taskOj.stats) {
         div.className = 'task done'
      }
      let text =document.createElement('h4')
      text.appendChild(document.createTextNode(taskOj.title))
      div.appendChild(text)
      let span = document.createElement('span')
      span.className = 'delete'
      span.appendChild(document.createTextNode('Delete'))
      let done = document.createElement('span')
      done.className ='doneBtn'
      done.appendChild(document.createTextNode('Done'))
      div.appendChild(done)
      div.appendChild(span)
      tasksDiv.appendChild(div)
   })
}

function addDataLocalStorage(tasksArray) {
   window.localStorage.setItem('tasks', JSON.stringify(tasksArray))
}

function gitDataLocalStorage() {
   let data = window.localStorage.getItem('tasks')
   if (data) {
      let tasks = JSON.parse(data)
      addElement(tasks)
   }
}

function deleteTask(taskId) {
   tasksArray = tasksArray.filter((el) => el.id != taskId)
   addDataLocalStorage(tasksArray)
}

function toggleStats(taskId) {
   for (let i = 0; i < tasksArray.length; i++) {
      if (tasksArray[i].id == taskId) {
         tasksArray[i].stats == false ? tasksArray[i].stats = true : tasksArray[i].stats = false
      }
   }
   addDataLocalStorage(tasksArray)
}


