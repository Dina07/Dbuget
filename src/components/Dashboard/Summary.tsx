import React, { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import '../../styles/base.css';

export const Summary: React.FC = () => {
  const { user, expenses } = useAppContext();

  // Calculate current month totals
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyExpenses = useMemo(() => {
    return expenses.filter(
      (exp) =>
        exp.date.getMonth() === currentMonth &&
        exp.date.getFullYear() === currentYear
    );
  }, [expenses, currentMonth, currentYear]);

  const totalExpensesThisMonth = useMemo(() => {
    return monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [monthlyExpenses]);

  const monthlySalary = user?.monthlySalary || 0;
  const balance = monthlySalary - totalExpensesThisMonth;

  return (
    <div className="summary-container">
      <div className="summary-card summary-card-income">
        <h3 className="summary-label">Monthly Income</h3>
        <p className="summary-amount-income">₹{monthlySalary.toFixed(2)}</p>
        <p className="summary-meta">Your monthly salary</p>
      </div>

      <div className="summary-card summary-card-expense">
        <h3 className="summary-label">Total Expenses</h3>
        <p className="summary-amount-expense">₹{totalExpensesThisMonth.toFixed(2)}</p>
        <p className="summary-meta">This month</p>
      </div>

      <div className="summary-card summary-card-balance">
        <h3 className="summary-label">Balance</h3>
        <p className={`summary-amount-balance ${balance < 0 ? 'text-red-600' : ''}`}>₹{balance.toFixed(2)}</p>
        <p className="summary-meta">Remaining</p>
      </div>
    </div>
  );
};
