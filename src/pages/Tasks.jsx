import { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskCard } from '../components/TaskCard';
import { TaskFormModal } from '../components/TaskFormModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { Plus, Search, Filter } from 'lucide-react';

export const Tasks = () => {
  const { tasks, toggleTaskStatus, toggleImportant, deleteTask, addTask, updateTask } = useTasks();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Combined Searching, Filtering, and Sorting Pipeline
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                              (task.description || '').toLowerCase().includes(search.toLowerCase());
        const matchesCat = categoryFilter === 'All' || task.category === categoryFilter;
        const matchesPri = priorityFilter === 'All' || task.priority === priorityFilter;
        const matchesStat = statusFilter === 'All' || task.status === statusFilter;
        return matchesSearch && matchesCat && matchesPri && matchesStat;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortBy === 'due-asc') return (a.dueDate || '9999') > (b.dueDate || '9999') ? 1 : -1;
        return 0;
      });
  }, [tasks, search, categoryFilter, priorityFilter, statusFilter, sortBy]);

  const handleCreateOrUpdate = (data) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
  };

  return (
    <div className="page-content">
      {/* Header bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>My Tasks</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage, filter, and prioritize your personal and work backlog.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filters & Search Controls */}
      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            className="input-control"
            style={{ paddingLeft: '2.4rem' }}
            placeholder="Search tasks by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
          <select className="select-control" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Projects">Projects</option>
            <option value="Other">Other</option>
          </select>

          <select className="select-control" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select className="select-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select className="select-control" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Created: Newest</option>
            <option value="oldest">Created: Oldest</option>
            <option value="due-asc">Sort by Due Date</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="card empty-state">
          <Filter size={32} className="empty-state-icon" />
          <h3>No matching tasks found</h3>
          <p>Try clearing filters or search queries.</p>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={toggleTaskStatus}
              onToggleImportant={toggleImportant}
              onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </div>
      )}

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialTask={editingTask}
      />

      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be reversed."
        onConfirm={() => { deleteTask(deleteId); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};