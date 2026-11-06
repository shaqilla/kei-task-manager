import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import { ConfirmModal } from '../components/ConfirmModal';
import { ShieldCheck, Moon, Sun, Trash2, Info } from 'lucide-react';

export const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { clearAllTasks, tasks } = useTasks();
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);

  return (
    <div className="page-content" style={{ maxWidth: 800 }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Settings</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Manage your dashboard appearance and local preferences.
        </p>
      </div>

      {/* Theme Settings */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Appearance</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Select your visual theme preference. Saved automatically.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTheme('light')}
          >
            <Sun size={16} /> Light Mode
          </button>
          <button
            className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTheme('dark')}
          >
            <Moon size={16} /> Dark Mode
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ marginBottom: '1.5rem', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--danger-text)', marginBottom: '0.5rem' }}>
          Data Management
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Currently storing {tasks.length} tasks locally in your browser storage.
        </p>
        <button className="btn btn-danger" onClick={() => setIsConfirmClearOpen(true)}>
          <Trash2 size={16} /> Clear All Tasks
        </button>
      </div>

      {/* System & Architecture Info */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <ShieldCheck size={20} color="var(--primary-600)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Client-Side Security & Architecture</h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          <strong>Kei Task Manager</strong> is built with a zero-backend architecture. All tasks, categories, and settings stay completely isolated inside your local browser storage. No data is sent to external servers or tracking trackers.
        </p>
        <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info size={16} />
          <span>Version 1.0.0 (Production Build) · Compatible with Cloudflare Pages</span>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmClearOpen}
        title="Clear All Stored Tasks?"
        message="This will permanently delete all task records from your browser's local storage. This action cannot be reversed."
        onConfirm={() => {
          clearAllTasks();
          setIsConfirmClearOpen(false);
        }}
        onCancel={() => setIsConfirmClearOpen(false)}
      />
    </div>
  );
};