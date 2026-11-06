import { Check, Star, Trash2, Edit3, Calendar } from 'lucide-react';

export const TaskCard = ({ task, onToggleStatus, onToggleImportant, onEdit, onDelete }) => {
  const isCompleted = task.status === 'Completed';

  const isOverdue = task.dueDate && !isCompleted && new Date(task.dueDate) < new Date().setHours(0,0,0,0);

  return (
    <div className={`task-item ${isCompleted ? 'completed' : ''}`}>
      <div className="task-left">
        <button
          className={`task-checkbox-btn ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggleStatus(task.id)}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              border: `2px solid ${isCompleted ? 'var(--primary-600)' : 'var(--text-dim)'}`,
              backgroundColor: isCompleted ? 'var(--primary-600)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isCompleted && <Check size={14} color="#ffffff" strokeWidth={3} />}
          </div>
        </button>

        <div className="task-details">
          <span className={`task-title ${isCompleted ? 'strike' : ''}`}>{task.title}</span>
          {task.description && <p className="task-desc">{task.description}</p>}
          <div className="task-meta">
            <span className="badge badge-cat">{task.category}</span>
            <span className={`badge badge-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span className={`badge-date ${isOverdue ? 'overdue' : ''}`}>
                <Calendar size={12} />
                {task.dueDate} {isOverdue && '(Overdue)'}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          className={`star-btn ${task.important ? 'active' : ''}`}
          onClick={() => onToggleImportant(task.id)}
          aria-label="Toggle importance"
        >
          <Star size={16} fill={task.important ? 'currentColor' : 'none'} />
        </button>

        <button className="action-btn" onClick={() => onEdit(task)} aria-label="Edit task">
          <Edit3 size={16} />
        </button>

        <button className="action-btn delete" onClick={() => onDelete(task.id)} aria-label="Delete task">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};