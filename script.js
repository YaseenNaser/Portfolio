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
