 tailwind.config = {
        theme: {
          extend: {
            colors: { primary: "#3b82f6", secondary: "#64748b" },
            borderRadius: {
              none: "0px",
              sm: "4px",
              DEFAULT: "8px",
              md: "12px",
              lg: "16px",
              xl: "20px",
              "2xl": "24px",
              "3xl": "32px",
              full: "9999px",
              button: "8px",
            },
          },
        },
      };
document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const emptyState = document.getElementById("emptyState");
    const taskCount = document.getElementById("taskCount");
    const completedCount = document.getElementById("completedCount");
    const pendingCount = document.getElementById("pendingCount");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function updateTaskCounts() {
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.length - completed;

    taskCount.textContent = pending;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;

        if (tasks.length === 0) {
                emptyState.classList.remove("hidden");
        } else {
                emptyState.classList.add("hidden");
        }
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
            updateTaskCounts();
    }
    
            function createTaskElement(task, index) {
                const taskItem = document.createElement("div");
                taskItem.className =
                "task-item flex items-center py-3 border-b border-gray-100 group";
                taskItem.innerHTML = `
                        <label class="checkbox-container flex items-center cursor-pointer">
                        <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
                        <div class="custom-checkbox"></div>
                        <span class="task-text ml-3 text-gray-700">${task.text}</span>
                        </label>
                        <button class="delete-btn ml-auto w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500" data-index="${index}">
                        <i class="ri-delete-bin-line"></i>
                        </button>`;

                const checkbox = taskItem.querySelector('input[type="checkbox"]');
                checkbox.addEventListener("change", function () {
                    const index = parseInt(this.getAttribute("data-index"));
                    tasks[index].completed = this.checked;
                        saveTasks();
                    });

                    const deleteBtn = taskItem.querySelector(".delete-btn");
                deleteBtn.addEventListener("click", function () {
                    const index = parseInt(this.getAttribute("data-index"));
                    tasks.splice(index, 1);
                    renderTasks();
                    saveTasks();
                });

                    return taskItem;
            }

            function renderTasks() {
                // Clear all task elements except the empty state
                const taskElements = taskList.querySelectorAll(".task-item");
                taskElements.forEach((element) => element.remove());

                // Add task elements
                tasks.forEach((task, index) => {
                    const taskElement = createTaskElement(task, index);
                    taskList.appendChild(taskElement);
                });

                updateTaskCounts();
            }

            addTaskBtn.addEventListener("click", function () {
            const text = taskInput.value.trim();
                if (text) {
                    tasks.push({
                    text: text,
                    completed: false,
                    });
                    taskInput.value = "";
                    renderTasks();
                    saveTasks();
                }
            });

            taskInput.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    addTaskBtn.click();
                }
            });

                // Initial render
                renderTasks();
});
