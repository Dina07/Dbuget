import React from 'react';
import '../../styles/base.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; 2025 DBudget. Personal Budget & Expenses Tracker.</p>
          <p className="footer-text">Developed by Dhinagaran</p>
        </div>
      </div>
    </footer>
  );
};
