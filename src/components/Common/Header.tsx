import React from 'react';
import { useAppContext } from '../../context/AppContext';
import '../../styles/base.css';

interface HeaderProps {
  title?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title = 'DBudget', onLogout }) => {
  const { user } = useAppContext();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="header-title">{title}</h1>
          <p className="header-subtitle">Personal Budget & Expenses Tracker</p>
        </div>
        {user && onLogout && (
          <div className="header-right">
            <span className="header-user-name">Welcome, {user.name}!</span>
            <button className="btn-logout" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
