import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/Common/Layout';
import { Onboarding } from './components/Onboarding/Onboarding';
import { ExpenseForm } from './components/Expenses/ExpenseForm';
import { ExpenseList } from './components/Expenses/ExpenseList';
import { Summary } from './components/Dashboard/Summary';
import { QuickStats } from './components/Dashboard/QuickStats';
import './styles/base.css';

function AppContent() {
  const { user, setUser } = useAppContext();
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user exists in localStorage when component mounts
    const savedUser = localStorage.getItem('dbudget_user');
    if (savedUser) {
      // User exists in localStorage, show dashboard
      setShowOnboarding(false);
    } else if (!user) {
      // No user in context or localStorage, show onboarding
      setShowOnboarding(true);
    } else {
      // User in context, show dashboard
      setShowOnboarding(false);
    }
  }, [user]);

  const handleLogout = () => {
    // Clear all localStorage
    localStorage.removeItem('dbudget_user');
    localStorage.removeItem('dbudget_expenses');
    // Reset app state
    setShowOnboarding(true);
    window.location.reload();
  };

  if (showOnboarding === null) {
    return <div>Loading...</div>;
  }

  if (showOnboarding) {
    return (
      <Onboarding onComplete={() => setShowOnboarding(false)} />
    );
  }

  return (
    <Layout title="DBudget" onLogout={handleLogout}>
      <div className="dashboard">
        <div className="dashboard-content">
          <Summary />
          <div className="dashboard-grid">
            <ExpenseForm />
            <QuickStats />
          </div>
          <ExpenseList />
        </div>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
