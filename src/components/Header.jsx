import React from 'react';

export function Header({ onToggleSidebar }) {
  return (
    <header className="app-header liquid-glass">
      <div className="app-brand">
        <div className="app-logo">C</div>
        <div className="app-name">Chatify</div>
      </div>
      <button className="menu-toggle" onClick={onToggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
    </header>
  );
}