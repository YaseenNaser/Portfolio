document.addEventListener("DOMContentLoaded", function () {
    // Load data for each page
    if (document.getElementById("taskList")) loadTasks();
    if (document.getElementById("gradeList")) loadGrades();
    if (document.querySelector(".portfolio-container")) loadProjects();

    // Initialize Contact Form
    if (document.getElementById("contactForm")) initContactForm();

    // Initialize Theme Toggle
    initThemeToggle();
});

// Helper: Save and Load from LocalStorage
function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// TASK ORGANIZER FUNCTIONS
function loadTasks() {
    const taskList = document.getElementById("taskList");
    const noTasksMessage = document.getElementById("noTasksMessage");

    const tasks = getFromLocalStorage("tasks");
    taskList.innerHTML = ""; // Clear current list

    if (tasks.length === 0) {
        if (noTasksMessage) noTasksMessage.style.display = "block";
    } else {
        if (noTasksMessage) noTasksMessage.style.display = "none";

        const fragment = document.createDocumentFragment();

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task;

            // Add "Remove" button if editable
            if (taskList.classList.contains("editable")) {
                const removeButton = createRemoveButton(() => removeTask(index));
                li.appendChild(removeButton);
            }

            fragment.appendChild(li);
        });

        taskList.appendChild(fragment);
    }
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();

    if (!task) {
        alert("Please enter a task!");
        return;
    }

    const tasks = getFromLocalStorage("tasks");
    tasks.push(task);
    saveToLocalStorage("tasks", tasks);

    taskInput.value = ""; // Clear input field
    loadTasks();
}

function removeTask(index) {
    const tasks = getFromLocalStorage("tasks");
    tasks.splice(index, 1);
    saveToLocalStorage("tasks", tasks);

    loadTasks();
}

// GRADE TRACKER FUNCTIONS
function loadGrades() {
    const gradeList = document.getElementById("gradeList");
    const noGradesMessage = document.getElementById("noGradesMessage");

    const grades = getFromLocalStorage("grades");
    gradeList.innerHTML = ""; // Clear current list

    if (grades.length === 0) {
        if (noGradesMessage) noGradesMessage.style.display = "block";
    } else {
        if (noGradesMessage) noGradesMessage.style.display = "none";

        const fragment = document.createDocumentFragment();

        grades.forEach((grade, index) => {
            const li = document.createElement("li");
            li.textContent = `${grade.subject}: ${grade.score}%`;

            // Add "Remove" button if editable
            if (gradeList.classList.contains("editable")) {
                const removeButton = createRemoveButton(() => removeGrade(index));
                li.appendChild(removeButton);
            }

            fragment.appendChild(li);
        });

        gradeList.appendChild(fragment);
    }
}

function addGrade() {
    const subjectInput = document.getElementById("subjectInput");
    const gradeInput = document.getElementById("gradeInput");

    const subject = subjectInput.value.trim();
    const score = parseFloat(gradeInput.value.trim());

    if (!subject || isNaN(score)) {
        alert("Please enter a valid subject and grade!");
        return;
    }

    const grades = getFromLocalStorage("grades");
    grades.push({ subject, score });
    saveToLocalStorage("grades", grades);

    subjectInput.value = "";
    gradeInput.value = "";

    loadGrades();
}

function removeGrade(index) {
    const grades = getFromLocalStorage("grades");
    grades.splice(index, 1);
    saveToLocalStorage("grades", grades);

    loadGrades();
}

// PROJECT FUNCTIONS
function loadProjects() {
    const projectContainers = document.querySelectorAll(".portfolio-container");
    const noProjectsMessages = document.querySelectorAll("#noProjectsMessage");

    const projects = getFromLocalStorage("projects");

    // Clear all existing content in containers
    projectContainers.forEach((container) => (container.innerHTML = ""));

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

                // Append title and description first
                projectDiv.appendChild(title);
                projectDiv.appendChild(description);

                // Add the Remove button below the content
                if (container.classList.contains("editable")) {
                    const removeButton = document.createElement("button");
                    removeButton.textContent = "Remove";
                    removeButton.onclick = () => {
                        removeProject(index); // Call the remove function
                    };
                    projectDiv.appendChild(removeButton); // Append the button to the bottom
                }

                container.appendChild(projectDiv); // Append the project div to the container
            });
        });
    }
}

function addProject() {
    const titleInput = document.getElementById("projectTitle");
    const descriptionInput = document.getElementById("projectDescription");

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title || !description) {
        alert("Please enter a valid title and description!");
        return;
    }

    const projects = getFromLocalStorage("projects");
    projects.push({ title, description });
    saveToLocalStorage("projects", projects);

    titleInput.value = "";
    descriptionInput.value = "";

    loadProjects();
}

function removeProject(index) {
    const projects = getFromLocalStorage("projects");
    projects.splice(index, 1);
    saveToLocalStorage("projects", projects);

    loadProjects();
}

// CONTACT FORM FUNCTION
function initContactForm() {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("All fields are required!");
            return;
        }

        const feedback = document.getElementById("formFeedback");
        feedback.textContent = `Thank you, ${name}! Your message has been received.`;
        feedback.style.display = "block";

        contactForm.reset();

        setTimeout(() => {
            feedback.style.display = "none";
        }, 3000);
    });
}

// Utility: Create Remove Button
function createRemoveButton(onClickHandler) {
    const button = document.createElement("button");
    button.textContent = "Remove";
    button.classList.add("btn-danger");
    button.onclick = onClickHandler;
    return button;
}

function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const darkModeEnabled = localStorage.getItem("darkMode") === "true";

    // Apply saved theme on load
    if (darkModeEnabled) {
        enableDarkMode();
        themeToggle.textContent = "☀️"; // Sun icon for toggling Light Mode
    }

    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);

        // Update button icon
        themeToggle.textContent = isDarkMode ? "☀️" : "🌙";

        // Apply or remove Dark Mode classes to child elements
        toggleDarkModeElements(isDarkMode);
    });
}

function enableDarkMode() {
    document.body.classList.add("dark-mode");

    // Add 'dark-mode' class to other elements
    document.querySelectorAll("header, footer, nav ul li a, input, textarea, button, .portfolio-item, #taskList li, #gradeList li").forEach((el) => {
        el.classList.add("dark-mode");
    });
}

function toggleDarkModeElements(enable) {
    document.querySelectorAll("header, footer, nav ul li a, input, textarea, button, .portfolio-item, #taskList li, #gradeList li").forEach((el) => {
        if (enable) {
            el.classList.add("dark-mode");
        } else {
            el.classList.remove("dark-mode");
        }
    });
}
