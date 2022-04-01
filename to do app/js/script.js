let first = document.getElementById("first");
let second = document.getElementById("second");
let show = document.getElementById("show");
let input = document.getElementById("input");
let add = document.getElementById("add");
let row = Array.from(document.getElementsByClassName("task"));
let clear = document.getElementById("clear");
let tasks;
let hrs = first.scrollHeight / 50;
displayHrs();
let i = 0;
// function to style my sketch
function displayHrs() {
  let cartona = "";
  for (let i = 0; i < hrs; i++) {
    cartona += `<hr>`;
  }
  first.innerHTML = cartona;
  second.innerHTML = cartona;
}
// constructor to get input value
class Task {
  constructor(taskValue) {
    this.value = taskValue.value;
  }
  // adding tasks to my array and local storge
  addTask() {
    tasks.push(input.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
  }
  // displaying tasks to my sketch
  displayTasks() {
    let taskContainer = "";
    tasks.forEach((task) => {
      taskContainer += `<div class="task">
        <div>
          <input class="form-check-input" type="checkbox" value="">
          <button class="btn1" type="button"><i class='bx bx-x'></i></button>
       </div>
        <span id = "${i}">${task}</span>
      </div>`;
      i++;
    });
    show.innerHTML = taskContainer;
    new Task(input).taskChanges();
  }
  // adding events to my action buttons
  taskChanges() {
    show.childNodes.forEach((el) => {
      //selecting each element in my sketch
      // mark event
      el.childNodes[1].childNodes[1].addEventListener("click", () => {
        if (el.childNodes[3].style.textDecoration == "line-through") {
          el.childNodes[3].style.textDecoration = "none";
        } else {
          el.childNodes[3].style.textDecoration = "line-through";
        }
      });
      // delete element event
      el.childNodes[1].childNodes[3].addEventListener("click", () => {
        let index = tasks.indexOf(el.childNodes[3].innerHTML);
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        new Task(input).displayTasks();
      });
    });
  }
  // deleting all tasks
  clearAll() {
    tasks.splice(0);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    new Task(input).displayTasks();
  }
}
// cheking if localstorge has any tasks
if (JSON.parse(localStorage.getItem("tasks")) == null) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  new Task(input).displayTasks();
}
// adding events to the form
add.addEventListener("click", () => {
  new Task(input).addTask();
  new Task(input).displayTasks();
});
clear.addEventListener("click", () => {
  new Task(input).clearAll();
});
