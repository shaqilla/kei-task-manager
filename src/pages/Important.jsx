import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskCard } from '../components/TaskCard';
import { ConfirmModal } from '../components/ConfirmModal';
import { TaskFormModal } from '../components/TaskFormModal';
import { Star } from 'lucide-react';

export const Important = () => {
  const { tasks, toggleTaskStatus, toggleImportant, deleteTask, updateTask } = useTasks();
  const [deleteId, setDeleteId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const importantTasks = tasks.filter(t => t.important);

  return (
    <div className="page-content">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Important Tasks</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          High priority items flagged for immediate focus.
        </p>
      </div>

      {importantTasks.length === 0 ? (
        <div className="card empty-state">
          <Star size={36} className="empty-state-icon" />
          <h3>No starred tasks</h3>
          <p>Click the star icon next to any task to bookmark it here.</p>
        </div>
      ) : (
        <div className="task-list">
          {importantTasks.map(task => (
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
        message="Are you sure you want to delete this important task?"
        onConfirm={() => { deleteTask(deleteId); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};