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
    priority: "High",
    startDate: "2026-01-03",
    endDate: "",
    targetDate: "2026-01-10",
    assignedTo: "Sam Lee (Operations Team)",
    archived: false
  }
];

// Additional seeded tasks
tasks.push(
  {
    id: "3",
    title: "Chase missing timesheets",
    name: "Chase missing timesheets",
    completed: false,
    status: "Not Started",
    priority: "High",
    startDate: "",
    endDate: "",
    targetDate: "2026-01-15",
    assignedTo: "Jamie Patel (Operations Team)",
    archived: false
  },
  {
    id: "4",
    title: "Weekly counsellor detail update across systems",
    name: "Weekly counsellor detail update across systems",
    completed: false,
    status: "In Progress",
    priority: "Medium",
    startDate: "2026-01-05",
    endDate: "",
    targetDate: "2026-01-20",
    assignedTo: "Morgan Hughes (Operations Team)",
    archived: false
  },
  {
    id: "5",
    title: "Prepare onboarding checklist for new starters",
    name: "Prepare onboarding checklist for new starters",
    completed: false,
    status: "Not Started",
    priority: "Low",
    startDate: "",
    endDate: "",
    targetDate: "2026-01-25",
    assignedTo: "Taylor Reed (Operations Team)",
    archived: false
  }
);

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
  // Ensure Not Started tasks have empty startDate
  if (task.status === 'Not Started') task.startDate = '';
  tasks.push(task);
  res.status(201).json(task);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, name, completed, priority, assignedTo, archived, startDate, endDate, targetDate, status } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  if (title !== undefined) task.title = title;
  if (name !== undefined) task.name = name;
  if (completed !== undefined) task.completed = completed;
  if (priority !== undefined) {
    const allowed = ['Low', 'Medium', 'High'];
    if (!allowed.includes(priority)) return res.status(400).json({ error: 'Invalid priority' });
    task.priority = priority;
  }
  if (assignedTo !== undefined) task.assignedTo = assignedTo;
  if (archived !== undefined) task.archived = archived;
  // If status is provided and is 'Not Started', clear startDate
  if (status !== undefined) {
    task.status = status;
    if (status === 'Not Started') {
      task.startDate = '';
    }
  }
  // Only set startDate if status is not 'Not Started' (either current or incoming)
  if (startDate !== undefined) {
    if (task.status !== 'Not Started') task.startDate = startDate;
    else task.startDate = '';
  }
  if (endDate !== undefined) task.endDate = endDate;
  if (targetDate !== undefined) task.targetDate = targetDate;
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
