import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { exportToCSV, exportToPDF, exportToImage } from '../../utils/exporters';
import '../../styles/base.css';

export const QuickStats: React.FC = () => {
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

  const chartData = useMemo(() => {
    return [
      {
        name: 'Expenses',
        amount: totalExpensesThisMonth,
      },
      {
        name: 'Balance',
        amount: Math.max(0, balance),
      },
    ];
  }, [totalExpensesThisMonth, balance]);

  const handleExportCSV = () => {
    if (!user) return;
    exportToCSV(monthlyExpenses, user.name, user.monthlySalary);
  };

  const handleExportPDF = () => {
    if (!user) return;
    exportToPDF(monthlyExpenses, user.name, user.monthlySalary);
  };

  const handleExportImage = async () => {
    await exportToImage('stats-chart', 'DBudget_Chart');
  };

  return (
    <div className="dashboard-card">
      <div className="stats-header">
        <h3 className="dashboard-card-title">Quick Stats</h3>
        <div className="export-buttons">
          <button className="btn-export btn-export-csv" onClick={handleExportCSV} title="Export to CSV">
            CSV
          </button>
          <button className="btn-export btn-export-pdf" onClick={handleExportPDF} title="Export to PDF">
            PDF
          </button>
          <button className="btn-export btn-export-image" onClick={handleExportImage} title="Export as Image">
            Image
          </button>
        </div>
      </div>

      <div id="stats-chart" className="stats-chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${(value as number).toFixed(2)}`} />
            <Bar dataKey="amount" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="stats-summary">
        <div className="stat-item">
          <p className="stat-label">Monthly Salary</p>
          <p className="stat-value">₹{monthlySalary.toFixed(2)}</p>
        </div>
        <div className="stat-item">
          <p className="stat-label">Total Expenses</p>
          <p className="stat-value text-red-600">₹{totalExpensesThisMonth.toFixed(2)}</p>
        </div>
        <div className="stat-item">
          <p className="stat-label">Remaining Balance</p>
          <p className={`stat-value ${balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
            ₹{balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
