import { Menu, Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Header = ({ onOpenMenu }) => {
  const { theme, toggleTheme } = useTheme();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={onOpenMenu} aria-label="Toggle Navigation">
          <Menu size={20} />
        </button>
        <div>
          <h1 className="greeting-title">Good morning, Kei</h1>
          <span className="greeting-date">{formattedDate}</span>
        </div>
      </div>

      <div className="header-right">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Color Theme" title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="notification-wrapper">
          <button className="icon-btn" aria-label="View notifications">
            <Bell size={18} />
            <span className="notification-badge" />
          </button>
        </div>
      </div>
    </header>
  );
};