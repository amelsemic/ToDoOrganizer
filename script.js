let tasks = [
  {
    id: 1,
    title: "Do groceries",
    content: "Healthy food only",
    finished: false,
  },
  {
    id: 2,
    title: "Read a book",
    content: "Finish reading The Book Thief book",
    finished: true,
  },
  {
    id: 3,
    title: "Create tests for course",
    content:
      "Create tests for Programming course (make sure to upload it to mega)",
    finished: false,
  },
];

const toDoList = document.querySelector("#todoList");
const doneList = document.querySelector("#doneList");
const modal = document.querySelector("#addModal");
const addBtn = document.querySelector("#addTaskBtn");
const closeBtn = document.querySelector("#closeBtn");
const saveBtn = document.querySelector("#saveBtn");

if (localStorage.getItem("taskovi"))
  tasks = JSON.parse(localStorage.getItem("taskovi"));

const generateHeadings = function () {};

const generateMarkup = function (newTask) {
  return `<div class="card" style="width: 18rem;" draggable="true" ondragstart="drag(event)" id="${
    newTask.finished ? "dnelements" : "tdelements"
  }">
            <div class="card-body" id='${newTask.id}'>
              <h5 class="card-title">${newTask.title}</h5>
              <p class="card-text">${newTask.content}</p>
              <a href="#" class="btn btn-primary ${
                newTask.finished ? "delete" : "finish"
              }">${newTask.finished ? "Delete" : "Finish"}</a>
            </div>
        </div>`;
};

const renderTasks = function (tasks) {
  toDoList.insertAdjacentHTML("afterbegin", "<h4>-- to-do list --</h4>");
  doneList.insertAdjacentHTML("afterbegin", "<h4>-- done tasks --</h4>");

  tasks.forEach((task) => {
    if (!task.finished)
      toDoList.insertAdjacentHTML("beforeend", generateMarkup(task));
    else if (task.finished)
      doneList.insertAdjacentHTML("beforeend", generateMarkup(task));
  });
};

const addNewTask = function (title, content) {
  tasks.push({
    id: Math.floor(Math.random() * 100),
    title,
    content,
    finished: false,
  });
  localStorage.setItem("taskovi", JSON.stringify(tasks));
};

renderTasks(tasks);

toDoList.addEventListener("click", function (e) {
  const taskID = e.target.closest("div").id;
  if (e.target.classList.contains("finish")) {
    tasks.forEach((task) => {
      if (task.id == taskID) task.finished = true;
    });

    toDoList.innerHTML = "";
    doneList.innerHTML = "";

    localStorage.setItem("taskovi", JSON.stringify(tasks));
    renderTasks(tasks);
  }
});

doneList.addEventListener("click", function (e) {
  const taskID = e.target.closest("div").id;

  if (e.target.classList.contains("delete")) {
    const tasksDeleteIndex = tasks.findIndex((task) => {
      return task.id == taskID;
    });
    tasks.splice(tasksDeleteIndex, 1);
    localStorage.setItem("taskovi", JSON.stringify(tasks));

    toDoList.innerHTML = "";
    doneList.innerHTML = "";
    renderTasks(tasks);
  }
});

addBtn.addEventListener("click", function () {
  modal.classList.add("show");
  modal.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("show");
  modal.style.display = "none";
});

saveBtn.addEventListener("click", function () {
  const ttl = document.querySelector("#title");
  const cntnt = document.querySelector("#content");

  if (ttl.value) {
    addNewTask(ttl.value, cntnt.value);
    toDoList.innerHTML = "";
    doneList.innerHTML = "";
    renderTasks(tasks);

    modal.classList.remove("show");
    modal.style.display = "none";
    ttl.value = "";
    cntnt.value = "";
  } else {
    alert("Title is required!");
  }
});

//
//Drag&drop funcionality
let idDrag;
let idDrop;

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  idDrag = ev.target.firstElementChild.id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  idDrop = ev.target.id;

  const indDrag = tasks.findIndex((task) => task.id == idDrag);
  if (!tasks[indDrag].finished && idDrop == "doneList") {
    tasks[indDrag].finished = true;
    toDoList.innerHTML = "";
    doneList.innerHTML = "";
    localStorage.setItem("taskovi", JSON.stringify(tasks));
    renderTasks(tasks);
  }
  if (tasks[indDrag].finished && idDrop == "todoList") {
    tasks[indDrag].finished = false;
    toDoList.innerHTML = "";
    doneList.innerHTML = "";
    localStorage.setItem("taskovi", JSON.stringify(tasks));
    renderTasks(tasks);
  }
}
