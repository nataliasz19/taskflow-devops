import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch('/tasks')
      .then((r) => r.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const res = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const newTask = await res.json();
      setTasks((s) => [...s, newTask]);
      setTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const toggle = async (task) => {
    try {
      const res = await fetch(`/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updated = await res.json();
      setTasks((s) => s.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (id) => {
    try {
      await fetch(`/tasks/${id}`, { method: 'DELETE' });
      setTasks((s) => s.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>TaskFlow</h1>
        <form onSubmit={addTask} className="task-form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task"
          />
          <button type="submit">Add</button>
        </form>

        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t.id} className={t.completed ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggle(t)}
                />
                <span>{t.title}</span>
              </label>
              <button onClick={() => remove(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
