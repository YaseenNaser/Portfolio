document.addEventListener("DOMContentLoaded", function () {
    // Load data for each section
    if (document.getElementById("taskList")) loadTasks();
    if (document.getElementById("gradeList")) loadGrades();
    if (document.querySelector(".portfolio-container")) loadProjects();

    // Initialize Contact Form functionality
    initContactForm();
});

// TASK ORGANIZER FUNCTIONS
function loadTasks() {
    const taskList = document.getElementById("taskList");
    const noTasksMessage = document.getElementById("noTasksMessage");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = ""; // Clear the current list

    if (tasks.length === 0) {
        noTasksMessage.style.display = "block";
    } else {
        noTasksMessage.style.display = "none";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task;

            if (taskList.classList.contains("editable")) {
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.onclick = () => removeTask(index);

                li.appendChild(removeButton);
            }

            taskList.appendChild(li);
        });
    }
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = ""; // Clear the input field
    loadTasks();
}

function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

// GRADE TRACKER FUNCTIONS
function loadGrades() {
    const gradeList = document.getElementById("gradeList");
    const noGradesMessage = document.getElementById("noGradesMessage");

    const grades = JSON.parse(localStorage.getItem("grades")) || [];
    gradeList.innerHTML = ""; // Clear the current list

    if (grades.length === 0) {
        noGradesMessage.style.display = "block";
    } else {
        noGradesMessage.style.display = "none";

        grades.forEach((grade, index) => {
            const li = document.createElement("li");
            li.textContent = `${grade.subject}: ${grade.score}%`;

            if (gradeList.classList.contains("editable")) {
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.onclick = () => removeGrade(index);

                li.appendChild(removeButton);
            }

            gradeList.appendChild(li);
        });
    }
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

    const grades = JSON.parse(localStorage.getItem("grades")) || [];
    grades.push({ subject, score });
    localStorage.setItem("grades", JSON.stringify(grades));

    subjectInput.value = ""; // Clear the input fields
    gradeInput.value = "";

    loadGrades();
}

function removeGrade(index) {
    const grades = JSON.parse(localStorage.getItem("grades")) || [];
    grades.splice(index, 1);
    localStorage.setItem("grades", JSON.stringify(grades));

    loadGrades();
}

// PROJECT FUNCTIONS
function loadProjects() {
    const projectContainers = document.querySelectorAll(".portfolio-container");
    const noProjectsMessages = document.querySelectorAll("#noProjectsMessage");

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    projectContainers.forEach((container) => (container.innerHTML = "")); // Clear existing content

    if (projects.length === 0) {
        noProjectsMessages.forEach((message) => (message.style.display = "block"));
    } else {
        noProjectsMessages.forEach((message) => (message.style.display = "none"));

        projectContainers.forEach((container) => {
            projects.forEach((project, index) => {
                const projectDiv = document.createElement("div");
                projectDiv.classList.add("portfolio-item");

                const title = document.createElement("h3");
                title.textContent = project.title;

                const description = document.createElement("p");
                description.textContent = project.description;

                if (container.classList.contains("editable")) {
                    const removeButton = document.createElement("button");
                    removeButton.textContent = "Remove";
                    removeButton.onclick = () => removeProject(index);

                    projectDiv.appendChild(removeButton);
                }

                projectDiv.appendChild(title);
                projectDiv.appendChild(description);
                container.appendChild(projectDiv);
            });
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
function initContactForm() {
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
}
