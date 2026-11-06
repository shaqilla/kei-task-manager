import { useTasks } from '../context/TaskContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toasts } = useTasks();

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className="toast">
          {toast.type === 'success' && <CheckCircle2 size={16} color="var(--success-text)" />}
          {toast.type === 'danger' && <AlertCircle size={16} color="var(--danger-text)" />}
          {toast.type === 'warning' && <AlertCircle size={16} color="var(--warning-text)" />}
          {toast.type === 'info' && <Info size={16} color="var(--primary-600)" />}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};