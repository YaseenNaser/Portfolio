document.addEventListener("DOMContentLoaded", function () {
    // Load data based on the page
    if (document.getElementById("taskList")) loadTasks();
    if (document.getElementById("gradeList")) loadGrades();
    if (document.querySelector(".portfolio-container")) loadProjects();
});

// TASK ORGANIZER FUNCTIONS
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

function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1); // Remove the task at the given index
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Reload tasks
    loadTasks();
}

// GRADE TRACKER FUNCTIONS
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

    updateChart(grades);
}

function addGrade() {
    const subjectInput = document.getElementById("subjectInput");
    const gradeInput = document.getElementById("gradeInput");

    const subject = subjectInput.value.trim();
    const score = parseFloat(gradeInput.value.trim());

    if (subject === "" || isNaN(score)) {
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

function removeGrade(index) {
    const grades = JSON.parse(localStorage.getItem("grades")) || [];
    grades.splice(index, 1); // Remove the grade at the given index
    localStorage.setItem("grades", JSON.stringify(grades));

    // Reload grades
    loadGrades();
}

function updateChart(grades) {
    const ctx = document.getElementById("gradeChart").getContext("2d");

    const subjects = grades.map((grade) => grade.subject);
    const scores = grades.map((grade) => grade.score);

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
                    data: scores,
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

// PROJECT FUNCTIONS
function loadProjects() {
    const projectContainer = document.querySelector(".portfolio-container");
    const noProjectsMessage = document.getElementById("noProjectsMessage");

    projectContainer.innerHTML = ""; // Clear the current list

    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    if (projects.length === 0) {
        noProjectsMessage.style.display = "block";
    } else {
        noProjectsMessage.style.display = "none";

        projects.forEach((project, index) => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("portfolio-item");

            const title = document.createElement("h3");
            title.textContent = project.title;

            const description = document.createElement("p");
            description.textContent = project.description;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.onclick = () => removeProject(index);

            projectDiv.appendChild(title);
            projectDiv.appendChild(description);
            projectDiv.appendChild(removeButton);
            projectContainer.appendChild(projectDiv);
        });
    }
}

function addProject() {
    const titleInput = document.getElementById("projectTitle");
    const descriptionInput = document.getElementById("projectDescription");

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === "" || description === "") {
        alert("Please enter both title and description!");
        return;
    }

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push({ title, description });
    localStorage.setItem("projects", JSON.stringify(projects));

    titleInput.value = "";
    descriptionInput.value = "";

    loadProjects();
}

function removeProject(index) {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects));

    loadProjects();
}

// CONTACT FORM FUNCTION
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    const feedback = document.getElementById("formFeedback");
    feedback.textContent = `Thank you, ${name}! Your message has been received.`;
    feedback.style.display = "block";

    document.getElementById("contactForm").reset();

    setTimeout(() => {
        feedback.style.display = "none";
    }, 3000);
});
