const taskInput = document.getElementById("task");
const dateInput = document.getElementById("date");
const priorityInput = document.getElementById("priority");
const saveBtn = document.getElementById("save-btn");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const deleteAllBtn = document.getElementById("delete-all");
const progress = document.getElementById("progress");

let totalTasks = 0;
let completedTasks = 0;

function updateProgress() {
  progress.textContent = `${completedTasks}/${totalTasks}`;
}

saveBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;
  const priority = priorityInput.value;

  if (!task || !date || !priority) return;

  totalTasks++;
  updateProgress();

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = `${task} [${priority}] - ${date}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      span.classList.add("done");
      doneList.appendChild(li);
      completedTasks++;
    } else {
      span.classList.remove("done");
      todoList.appendChild(li);
      completedTasks--;
    }
    updateProgress();
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
    if (checkbox.checked) completedTasks--;
    totalTasks--;
    updateProgress();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  taskInput.value = "";
  dateInput.value = "";
  priorityInput.value = "";
});

deleteAllBtn.addEventListener("click", () => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
  totalTasks = 0;
  completedTasks = 0;
  updateProgress();
});
