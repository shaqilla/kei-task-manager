import { AlertCircle } from 'lucide-react';

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal-card" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-body" style={{ textAlign: 'center', padding: '2rem 1.5rem 1rem' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: 'var(--danger-bg)',
              color: 'var(--danger-text)',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 1rem'
            }}
          >
            <AlertCircle size={24} />
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{title}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{message}</p>
        </div>
        <div className="modal-footer" style={{ justifyContent: 'center', borderTop: 'none' }}>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};