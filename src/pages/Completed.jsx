import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskCard } from '../components/TaskCard';
import { ConfirmModal } from '../components/ConfirmModal';
import { TaskFormModal } from '../components/TaskFormModal';
import { CheckCircle2 } from 'lucide-react';

export const Completed = () => {
  const { tasks, toggleTaskStatus, toggleImportant, deleteTask, updateTask } = useTasks();
  const [deleteId, setDeleteId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const completedTasks = tasks.filter(t => t.status === 'Completed');

  return (
    <div className="page-content">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Completed Tasks</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Review archive of {completedTasks.length} finished {completedTasks.length === 1 ? 'task' : 'tasks'}.
        </p>
      </div>

      {completedTasks.length === 0 ? (
        <div className="card empty-state">
          <CheckCircle2 size={36} className="empty-state-icon" />
          <h3>No completed tasks yet</h3>
          <p>Check off tasks in your task lists once finished.</p>
        </div>
      ) : (
        <div className="task-list">
          {completedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={toggleTaskStatus}
              onToggleImportant={toggleImportant}
              onEdit={(t) => setEditingTask(t)}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </div>
      )}

      <TaskFormModal
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        onSubmit={(data) => updateTask(editingTask.id, data)}
        initialTask={editingTask}
      />

      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Delete Task"
        message="Are you sure you want to permanently remove this completed task?"
        onConfirm={() => { deleteTask(deleteId); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};