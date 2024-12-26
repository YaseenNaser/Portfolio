// Function to load tasks from localStorage
function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear the current list

    // Get tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks in the UI
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        // Add a remove button to each task
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeTask(index);

        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}

// Function to add a task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    // Save the task to localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear the input field
    taskInput.value = "";

    // Reload tasks
    loadTasks();
}

// Function to remove a task
function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1); // Remove the task at the given index
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Reload tasks
    loadTasks();
}

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);


// Function to load grades from localStorage
function loadGrades() {
    const gradeList = document.getElementById("gradeList");
    gradeList.innerHTML = ""; // Clear the current list

    // Get grades from localStorage
    const grades = JSON.parse(localStorage.getItem("grades")) || [];

    // Render grades in the UI
    grades.forEach((grade, index) => {
        const li = document.createElement("li");
        li.textContent = `${grade.subject}: ${grade.score}%`;

        // Add a remove button to each grade
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeGrade(index);

        li.appendChild(removeButton);
        gradeList.appendChild(li);
    });
}

// Function to add a grade
function addGrade() {
    const subjectInput = document.getElementById("subjectInput");
    const gradeInput = document.getElementById("gradeInput");

    const subject = subjectInput.value.trim();
    const score = gradeInput.value.trim();

    if (subject === "" || score === "") {
        alert("Please enter both subject and grade!");
        return;
    }

    // Save the grade to localStorage
    const grades = JSON.parse(localStorage.getItem("grades")) || [];
    grades.push({ subject, score });
    localStorage.setItem("grades", JSON.stringify(grades));

    // Clear the input fields
    subjectInput.value = "";
    gradeInput.value = "";

    // Reload grades
    loadGrades();
}

// Function to remove a grade
function removeGrade(index) {
    const grades = JSON.parse(localStorage.getItem("grades")) || [];
    grades.splice(index, 1); // Remove the grade at the given index
    localStorage.setItem("grades", JSON.stringify(grades));

    // Reload grades
    loadGrades();
}

// Load grades when the page loads
document.addEventListener("DOMContentLoaded", loadGrades);


// Function to update the chart
function updateChart() {
    const ctx = document.getElementById("gradeChart").getContext("2d");

    if (window.gradeChart) {
        window.gradeChart.destroy();
    }

    window.gradeChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: subjects,
            datasets: [
                {
                    label: "Grades",
                    data: grades,
                    backgroundColor: "rgba(0, 120, 215, 0.7)",
                    borderColor: "rgba(0, 120, 215, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                },
            },
        },
    });
}

// Handle contact form submission
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Display feedback
    const feedback = document.getElementById("formFeedback");
    feedback.style.display = "block";

    // Clear form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    // Hide feedback after a few seconds (optional)
    setTimeout(() => {
        feedback.style.display = "none";
    }, 3000);
});
