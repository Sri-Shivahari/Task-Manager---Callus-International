// main.js - Frontend logic for Task Manager
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

const API_URL = 'http://localhost:5000/tasks';

// Fetch tasks from API
async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task.title} - ${task.status} 
            <button onclick="deleteTask('${task._id}')">Delete</button>`;
        taskList.appendChild(li);
    });
}

// Add new task
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const status = document.getElementById('task-status').value;
    
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status })
    });
    fetchTasks();
    taskForm.reset();
});

// Delete task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

// Initial fetch
fetchTasks();
