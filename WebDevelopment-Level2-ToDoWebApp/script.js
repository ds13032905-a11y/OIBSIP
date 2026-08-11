const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("add");

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {

    tasks.forEach(function (task) {

        createTask(
            task.text,
            task.completed,
            task.time
        );

    });

    checkEmpty();
    updateCount();
};

addBtn.addEventListener("click", function () {

    let task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    let time = new Date().toLocaleString();

    let newTask = {
        text: task,
        completed: false,
        time: time
    };

    tasks.push(newTask);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    createTask(task, false, time);

    taskInput.value = "";

    checkEmpty();
    updateCount();

});

function createTask(task, completed, time) {

    let li = document.createElement("li");
    let taskText = document.createElement("span");

    taskText.innerText = task;
    let taskTime = document.createElement("small");

    taskTime.innerText = "Added : " + time;
    let completeBtn = document.createElement("button");

    completeBtn.innerText = "Complete";

    completeBtn.className = "complete-btn";
    let editBtn = document.createElement("button");

    editBtn.innerText = "Edit";

    editBtn.className = "edit-btn";

    let deleteBtn = document.createElement("button");

    deleteBtn.innerText = "Delete";

    deleteBtn.className = "delete-btn";

    li.appendChild(taskText);

    li.appendChild(document.createElement("br"));

    li.appendChild(taskTime);

    li.appendChild(document.createElement("br"));
    if (!completed) {
        li.appendChild(completeBtn);
    }
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    if (completed) {

        let empty = completedList.querySelector(".empty");

        if (empty) {
            empty.remove();
        }

    } else {

        let empty = pendingList.querySelector(".empty");

        if (empty) {
            empty.remove();
        }

    }

    if (completed) {

        completedList.appendChild(li);

    } else {

        pendingList.appendChild(li);

    }

    completeBtn.addEventListener("click", function () {

        completeBtn.remove();

        completedList.appendChild(li);

        tasks.forEach(function (t) {

            if (t.time === time) {

                t.completed = true;

            }

        });

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );


        checkEmpty();
        updateCount();

    });


    editBtn.addEventListener("click", function () {


        if (editBtn.innerText === "Edit") {

            let editInput = document.createElement("input");

            editInput.type = "text";

            editInput.value = taskText.innerText;

            editInput.className = "edit-input";

            taskText.replaceWith(editInput);

            editBtn.innerText = "Save";

        }

        else {


            let editInput = li.querySelector("input");

            let newTask = editInput.value.trim();

            if (newTask === "") {

                alert("Task cannot be empty");

                return;

            }
            taskText.innerText = newTask;
            editInput.replaceWith(taskText);
            editBtn.innerText = "Edit";

            tasks.forEach(function (t) {

                if (t.time === time) {

                    t.text = newTask;

                }

            });


            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );

        }

    });

    deleteBtn.addEventListener("click", function () {
        li.remove();

        tasks = tasks.filter(function (t) {

            return t.time !== time;

        });

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );


        checkEmpty();
        updateCount();

    });

}


function updateCount() {

    let pendingTasks =
        pendingList.querySelectorAll(
            "li:not(.empty)"
        ).length;


    let completedTasks =
        completedList.querySelectorAll(
            "li:not(.empty)"
        ).length;


    pendingCount.innerText = pendingTasks;

    completedCount.innerText = completedTasks;

}


function checkEmpty() {

    let pendingTasks =
        pendingList.querySelectorAll(
            "li:not(.empty)"
        ).length;


    let completedTasks =
        completedList.querySelectorAll(
            "li:not(.empty)"
        ).length;

    if (pendingTasks === 0) {

        if (!pendingList.querySelector(".empty")) {

            pendingList.innerHTML =
                '<li class="empty">No pending tasks.</li>';

        }

    } else {

        let empty =
            pendingList.querySelector(".empty");

        if (empty) {
            empty.remove();
        }

    }

    if (completedTasks === 0) {

        if (!completedList.querySelector(".empty")) {

            completedList.innerHTML =
                '<li class="empty">No completed tasks.</li>';

        }

    } else {

        let empty =
            completedList.querySelector(".empty");

        if (empty) {
            empty.remove();
        }

    }


    updateCount();

}