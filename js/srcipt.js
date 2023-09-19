const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasklist = document.querySelector('#task-list');
const btndelete = document.querySelector('#delete-done');

let tasks = []; 
if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => render(task));
};

checkempty();
addBtnDeleteDone();

form.addEventListener('submit', addTask);
tasklist.addEventListener('click', deleteTask);
tasklist.addEventListener('click', doneTask);
tasklist.addEventListener('click', editTask);
btndelete.addEventListener('click', addActive);

function addTask(e){
    
    e.preventDefault();

    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        done: false,
    };

    tasks.push(newTask);
    saveToLocalStorage();

    render(newTask);

    taskInput.value = " ";
    taskInput.focus();
    checkempty();
};
function deleteTask(e){
    if(e.target.dataset.action == "delete"){

        const parentNode = e.target.closest('li');

        const id = parentNode.id;

        const index = tasks.findIndex((task) => task.id == id);

        tasks.splice(index, 1)
        saveToLocalStorage();
        parentNode.remove();
    };
    checkempty();
};
function doneTask(e){ 
    if(e.target.dataset.action == "done"){
        const parentNode = e.target.closest('li')
        parentNode.classList.toggle('active')

        const id = parentNode.id;
        const task = tasks.find((task) => task.id == id);
        task.done = !task.done
        saveToLocalStorage();
    };
    addBtnDeleteDone();
};
function editTask(e){
    const parentNode = e.target.closest('li');
    const TextTitle = parentNode.querySelector("#taskTitle");
    const inputEdit = `<input type="text" class="inputEdit" id="inputEdit" value="${TextTitle.textContent.trim()}" required>`;
    if(e.target.dataset.action == "edit"){
        TextTitle.insertAdjacentHTML("beforebegin", inputEdit);
        TextTitle.classList.add('active-title');
        e.target.dataset.action = "active-edit";

    }else if(e.target.dataset.action == "active-edit"){
        e.target.dataset.action = "edit"
        const inputEditActive = parentNode.querySelector('#inputEdit').value;
        TextTitle.textContent = inputEditActive;
        parentNode.querySelector('#inputEdit').remove();
        TextTitle.classList.remove('active-title');

        const id = parentNode.id;
        const task = tasks.find((task) => task.id == id);
        task.text = inputEditActive;
        saveToLocalStorage();
    };
};
function checkempty(){
    const elements = document.querySelectorAll('li');
    if (elements.length === 0){
        const emptyelement = `<li class="empty-item list-reset" id="empty-list">
            <img src="img/file-svgrepo-com (1).svg" alt="" class="empty-item" width="100" height="100">
            <div class="empty-item__text">
                Задач нет
            </div>  
        </li>`
        tasklist.insertAdjacentHTML('afterbegin',emptyelement)
        // console.log(elements.length);
        
    }

    const emptyelementHtml = document.querySelector('#empty-list')
    if (elements.length > 0){
        
        if(emptyelementHtml){
            emptyelementHtml.remove();
        };
    }
};
function addBtnDeleteDone(){
    const active = document.querySelectorAll('.active');
    if (active.length >= 2){
        btndelete.classList.add("active-btn");
    };
    if (active.length < 2){
        btndelete.classList.remove("active-btn");
    };
    
};
function addActive(){
    ArrayActive =  document.querySelectorAll('.active');
    ArrayActive.forEach(function(a){
        a.remove();
    });

    tasks.forEach(function(item){
        if (item.done == true){
            tasks.splice(item, 1)
        }
    });
    // console.log(task.done)
    saveToLocalStorage();
    addBtnDeleteDone();
    checkempty();
};
function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function render(task){
    const checkDone = task.done ? "task active" : "task"
    const newTaskHtml = `<li id="${task.id}" class="${checkDone} list-reset">
        <div class="task__left">
            <button class="btn-reset btn__img btn__done" data-action="done">
                <div class="svg-done" id="taskSvg">
                    <img id="done" src="img/circle-svgrepo-com.svg" alt="done" width="40px" height="40px">
                </div>
            </button>
            <h3 class="title__task" id="taskTitle">
                ${task.text}
            </h3>
        </div>
        <div class="task__right">
            <button class="btn-reset btn__img" data-action="edit" id="editbtn">
                <img id="edit" src="img/pen-square-svgrepo-com.svg" alt="edit" width="40px" height="40px">
            </button>
            <button class="btn-reset btn__img" data-action="delete" id="deletebtn">
                <img id="delete" src="img/xmark-svgrepo-com (1).svg" alt="delete" width="40px" height="40px">
            </button>
        </div>
    </li>`;

    tasklist.insertAdjacentHTML('beforeend', newTaskHtml)
}








