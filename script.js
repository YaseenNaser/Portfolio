// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new list item
    const li = document.createElement("li");
    li.textContent = taskInput.value;

    // Add a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        li.remove();
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
}

// Array to store grades
const grades = [];
const subjects = [];

// Function to add a grade
function addGrade() {
    const subjectInput = document.getElementById("subjectInput");
    const gradeInput = document.getElementById("gradeInput");
    const gradeList = document.getElementById("gradeList");

    const subject = subjectInput.value.trim();
    const grade = parseFloat(gradeInput.value);

    if (!subject || isNaN(grade) || grade < 0 || grade > 100) {
        alert("Please enter a valid subject and grade (0-100)!");
        return;
    }

    // Store grades and subjects
    grades.push(grade);
    subjects.push(subject);

    // Add to the grade list
    const li = document.createElement("li");
    li.textContent = `${subject}: ${grade}%`;
    gradeList.appendChild(li);

    // Clear inputs
    subjectInput.value = "";
    gradeInput.value = "";

    // Update chart
    updateChart();
}

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
