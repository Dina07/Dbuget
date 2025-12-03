import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import '../../styles/base.css';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, onLogout }) => {
  return (
    <div className="layout">
      <Header title={title} onLogout={onLogout} />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};
