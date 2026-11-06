import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { StatCard } from '../components/StatCard';
import { TaskCard } from '../components/TaskCard';
import { TaskFormModal } from '../components/TaskFormModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { CheckSquare, Clock, Star, CheckCircle2, Plus } from 'lucide-react';

export const Dashboard = () => {
  const { tasks, toggleTaskStatus, toggleImportant, deleteTask, addTask, updateTask } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const pending = total - completed;
  const important = tasks.filter(t => t.important).length;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const recentTasks = [...tasks].slice(0, 5);

  const handleCreateOrUpdate = (data) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
  };

  return (
    <div className="page-content">
      {/* 4 Key Stat Cards */}
      <div className="stat-grid">
        <StatCard icon={CheckSquare} label="Total Tasks" value={total} variant="primary" />
        <StatCard icon={CheckCircle2} label="Completed Tasks" value={completed} variant="success" />
        <StatCard icon={Clock} label="Pending Tasks" value={pending} variant="warning" />
        <StatCard icon={Star} label="Important Tasks" value={important} variant="danger" />
      </div>

      {/* Productivity Overview Widget */}
      <div className="overview-grid">
        <div className="card progress-card">
          <div>
            <div className="progress-header">
              <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Overall Progress</h2>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-600)' }}>{rate}%</span>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Keep going! Consistent progress leads to successful completion.
            </p>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${rate}%` }} />
            </div>
          </div>
          <div className="progress-stats-row">
            <span>{completed} Completed</span>
            <span>{pending} Incomplete</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Quick Actions</h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
            Capture a thought, project milestone, or action item into your workspace instantly.
          </p>
          <div>
            <button className="btn btn-primary" onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>
              <Plus size={16} />
              <span>Create New Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Tasks</h2>
      </div>

      {recentTasks.length === 0 ? (
        <div className="card empty-state">
          <h3>No tasks created yet</h3>
          <p>Get started by clicking Create New Task above.</p>
        </div>
      ) : (
        <div className="task-list">
          {recentTasks.map(task => (
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
        message="Are you sure you want to permanently remove this task? This action cannot be undone."
        onConfirm={() => { deleteTask(deleteId); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};