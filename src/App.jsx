import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Sidebar } from './components/SideBar.jsx';
import { Header } from './components/Header.jsx';
import { Toast } from './components/Toast.jsx';

import { Dashboard } from './pages/Dashboard.jsx';
import { Tasks } from './pages/Tasks.jsx';
import { Completed } from './pages/Completed.jsx';
import { Important } from './pages/Important.jsx';
import { Settings } from './pages/Settings.jsx';

export const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="main-content-wrap">
        <Header onOpenMenu={() => setIsSidebarOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/important" element={<Important />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>

      <Toast />
    </div>
  );
};