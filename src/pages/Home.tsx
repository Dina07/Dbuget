import React from 'react';
import { Summary } from '../components/Dashboard/Summary';
import '../styles/base.css';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>
      <Summary />
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Recent Transactions</h3>
          <div className="transaction-list">
            <div className="transaction-item">
              <div className="transaction-info">
                <p className="transaction-name">Salary</p>
                <p className="transaction-category">Income</p>
              </div>
              <span className="transaction-amount transaction-amount-income">+₹5,000</span>
            </div>
            <div className="transaction-item">
              <div className="transaction-info">
                <p className="transaction-name">Groceries</p>
                <p className="transaction-category">Food & Drink</p>
              </div>
              <span className="transaction-amount transaction-amount-expense">-₹150</span>
            </div>
            <div className="transaction-item">
              <div className="transaction-info">
                <p className="transaction-name">Utilities</p>
                <p className="transaction-category">Bills</p>
              </div>
              <span className="transaction-amount transaction-amount-expense">-₹200</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Quick Actions</h3>
          <div className="action-buttons">
            <button className="btn btn-primary">
              + Add Income
            </button>
            <button className="btn btn-danger">
              + Add Expense
            </button>
            <button className="btn btn-secondary">
              View Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
