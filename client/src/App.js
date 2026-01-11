import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then((r) => r.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, priority, assignedTo, targetDate }),
      });
      const newTask = await res.json();
      setTasks((s) => [...s, newTask]);
      setTitle('');
      setPriority('Medium');
      setAssignedTo('');
      setTargetDate('');
    } catch (err) {
      console.error(err);
    }
  };

  const toggle = async (task) => {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
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

  const updateTaskField = async (id, patch) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      const updated = await res.json();
      setTasks((s) => s.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const priorityColor = (p) => {
    if (!p) return '#6b7280';
    if (p === 'High') return '#ef4444';
    if (p === 'Medium') return '#f97316';
    if (p === 'Low') return '#10b981';
    return '#6b7280';
  };

  const remove = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      setTasks((s) => s.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleArchive = async (task) => {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archived: !task.archived })
      });
      const updated = await res.json();
      setTasks((s) => s.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

    // Filters
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [assignedFilter, setAssignedFilter] = useState('All');

    const assignedOptions = Array.from(new Set(tasks.map((t) => t.assignedTo))).filter(Boolean);

    const filteredTasks = tasks.filter((t) => {
      if (statusFilter === 'Active' && t.completed) return false;
      if (statusFilter === 'Completed' && !t.completed) return false;
      if (priorityFilter !== 'All' && t.priority !== priorityFilter) return false;
      if (assignedFilter !== 'All' && t.assignedTo !== assignedFilter) return false;
      if (searchTerm) {
        const name = (t.name || t.title || '').toLowerCase();
        if (!name.includes(searchTerm.toLowerCase())) return false;
      }
      if (!showArchived && t.archived) return false;
      return true;
    });

  return (
    <div className="App">
      <div className="container">
        <h1>TaskFlow</h1>
        <form onSubmit={addTask} className="task-form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Assigned to"
          />
          <div className="field-with-label">
            <label>Target date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              title="Target date"
            />
          </div>
          <button type="submit">Add</button>
        </form>

        <div style={{display:'flex',gap:8,marginBottom:12,alignItems:'center'}}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
            style={{padding:8,borderRadius:6,border:'1px solid #e6e9ef',flex:1}}
          />
          <label style={{display:'flex',alignItems:'center',gap:6}}>
            <input type="checkbox" checked={showArchived} onChange={(e)=>setShowArchived(e.target.checked)} />
            <span style={{fontSize:12}}>Show archived</span>
          </label>
        </div>

        <div style={{display:'flex',gap:8,marginBottom:12}}>
          <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
            <option value="All">All status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
          <select value={priorityFilter} onChange={(e)=>setPriorityFilter(e.target.value)}>
            <option value="All">All priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select value={assignedFilter} onChange={(e)=>setAssignedFilter(e.target.value)}>
            <option value="All">All assignees</option>
            {assignedOptions.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div className="table-wrapper">
          <div className="task-headers">
            <div>Task</div>
            <div>Priority</div>
            <div>Status</div>
            <div>Start</div>
            <div>End</div>
            <div>Target</div>
            <div>Assigned</div>
            <div>Actions</div>
          </div>

          <ul className="task-list">
          {filteredTasks.map((t) => (
            <li key={t.id} className={t.completed ? 'done' : ''}>
              <div className="task-row">
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <input type="checkbox" checked={t.completed} onChange={()=>toggle(t)} />
                  <div style={{textAlign:'left'}}>
                    <div><strong>{t.title}</strong></div>
                  </div>
                </div>
                <div>
                  <span className="priority-badge" style={{background: priorityColor(t.priority)}}>{t.priority}</span>
                </div>
                <div>
                  <select className="status-select" value={t.status || 'Not Started'} onChange={(e)=>updateTaskField(t.id,{status:e.target.value})}>
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div><input type="date" value={t.startDate || ''} onChange={(e)=>updateTaskField(t.id,{startDate:e.target.value})} /></div>
                <div><input type="date" value={t.endDate || ''} onChange={(e)=>updateTaskField(t.id,{endDate:e.target.value})} /></div>
                <div><input type="date" value={t.targetDate || ''} onChange={(e)=>updateTaskField(t.id,{targetDate:e.target.value})} /></div>
                <div style={{fontSize:13,color:'#374151'}}>{t.assignedTo}</div>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={() => toggleArchive(t)}>{t.archived ? 'Unarchive' : 'Archive'}</button>
                  <button onClick={() => remove(t.id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
