const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: "1",
    title: "Prepare weekly operations report",
    name: "Prepare weekly operations report",
    completed: false,
    status: "In Progress",
    priority: "High",
    startDate: "2026-01-01",
    endDate: "",
    targetDate: "2026-01-07",
    assignedTo: "Alex Morgan (Operations Team)",
    archived: false
  },
  {
    id: "2",
    title: "Update internal documentation",
    name: "Update internal documentation",
    completed: false,
    status: "Not Started",
    priority: "Medium",
    startDate: "2026-01-03",
    endDate: "",
    targetDate: "2026-01-10",
    assignedTo: "Sam Lee (Operations Team)",
    archived: false
  }
];

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Create a task
app.post('/api/tasks', (req, res) => {
  const task = {
    id: Date.now().toString(),
    ...req.body
  };
  tasks.push(task);
  res.status(201).json(task);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed, priority, assignedTo, archived } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  if (priority !== undefined) {
    const allowed = ['Low', 'Medium', 'High'];
    if (!allowed.includes(priority)) return res.status(400).json({ error: 'Invalid priority' });
    task.priority = priority;
  }
  if (assignedTo !== undefined) task.assignedTo = assignedTo;
  if (archived !== undefined) task.archived = archived;
  res.json(task);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const initialLen = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === initialLen) return res.status(404).json({ error: 'Task not found' });
  res.status(204).end();
});

/*
Notes on swapping to PostgreSQL in production:
- Replace the in-memory `tasks` array with a database client (e.g. `pg`),
  move data access into a separate module (repository pattern), and perform
  migrations to create a `tasks` table with columns (id UUID PK, title TEXT,
  completed BOOLEAN, priority TEXT, assigned_to TEXT).
- For CI/local dev you can use SQLite or an in-memory DB and run tests against it.
*/

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`TaskFlow API running on port ${PORT}`));
