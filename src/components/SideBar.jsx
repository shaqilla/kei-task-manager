import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  CheckCircle2,
  Star,
  Settings,
  Sparkles,
  X
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'My Tasks', path: '/tasks', icon: CheckSquare },
    { label: 'Important', path: '/important', icon: Star },
    { label: 'Completed', path: '/completed', icon: CheckCircle2 },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      <div className={`sidebar-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
          <div className="sidebar-header">
            <div className="logo-badge">
              <Sparkles size={18} />
            </div>
            <span className="logo-text">Kei Manager</span>
            <button className="menu-toggle-btn" style={{ marginLeft: 'auto' }} onClick={onClose} aria-label="Close menu">
              <X size={18} />
            </button>
          </div>

          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={onClose}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="user-avatar">K</div>
          <div className="user-info">
            <div className="user-name">Kei Takahashi</div>
            <div className="user-role">Product Engineer</div>
          </div>
        </div>
      </aside>
    </>
  );
};