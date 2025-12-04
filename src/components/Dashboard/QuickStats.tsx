import React, { useRef, useState } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { exportToCSV, exportToPDF, exportToImage } from '../../utils/exporters';
import { ExpenseFormModal } from '../Expenses/ExpenseFormModal';
import '../../styles/base.css';

type ChartType = 'bar' | 'pie';

export const QuickStats: React.FC = () => {
  const { user, getMonthlyExpenses, getRemainingBudget, expenses } =
    useAppContext();
  const chartRef = useRef<HTMLDivElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [isChartDropdownOpen, setIsChartDropdownOpen] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  if (!user) return null;

  const monthlyExpenses = getMonthlyExpenses(
    new Date().getMonth() + 1,
    new Date().getFullYear()
  );
  const remainingBudget = getRemainingBudget();

  const barChartData = [
    {
      name: 'Monthly Stats',
      Expenses: monthlyExpenses,
      Balance: remainingBudget,
    },
  ];

  const pieChartData = [
    {
      name: 'Expenses',
      value: monthlyExpenses,
    },
    {
      name: 'Total Income',
      value: user.monthlyIncome,
    },
  ];

  const handleExportCSV = () => {
    exportToCSV(expenses, user.name, user.monthlyIncome);
  };

  const handleExportPDF = () => {
    exportToPDF(expenses, user.name, user.monthlyIncome);
  };

  const handleExportImage = async () => {
    await exportToImage('quick-stats-chart-ref', 'monthly-stats');
  };

  return (
    <div className="quick-stats-container">
      <div className="quick-stats-header">
        <div>
          <h2 className="quick-stats-title">📊 Quick Stats</h2>
          <p className="quick-stats-subtitle">
            Your financial overview at a glance
          </p>
        </div>
        <div className="export-buttons-group">
          <button
            className="btn btn-primary"
            onClick={() => setIsFormOpen(true)}
            title="Add new expense"
          >
            ➕ Add Expense
          </button>

          {/* Chart Type Dropdown */}
          <div className="dropdown-container">
            <button
              className="dropdown-btn"
              onClick={() => setIsChartDropdownOpen(!isChartDropdownOpen)}
              title="Select chart type"
            >
              📊 Chart Type ▼
            </button>
            {isChartDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  className={`dropdown-item ${chartType === 'bar' ? 'active' : ''}`}
                  onClick={() => {
                    setChartType('bar');
                    setIsChartDropdownOpen(false);
                  }}
                >
                  📊 Bar Chart
                </button>
                <button
                  className={`dropdown-item ${chartType === 'pie' ? 'active' : ''}`}
                  onClick={() => {
                    setChartType('pie');
                    setIsChartDropdownOpen(false);
                  }}
                >
                  🥧 Pie Chart
                </button>
              </div>
            )}
          </div>

          {/* Export Options Dropdown */}
          <div className="dropdown-container">
            <button
              className="dropdown-btn"
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              title="Export data"
            >
              📥 Export ▼
            </button>
            {isExportDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    handleExportCSV();
                    setIsExportDropdownOpen(false);
                  }}
                >
                  📄 CSV
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    handleExportPDF();
                    setIsExportDropdownOpen(false);
                  }}
                >
                  📕 PDF
                </button>
                <button
                  className="dropdown-item"
                  onClick={async () => {
                    await handleExportImage();
                    setIsExportDropdownOpen(false);
                  }}
                >
                  🖼️ Image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="quick-stats-summary">
        <div className="quick-stat-card quick-stat-income">
          <div className="quick-stat-icon">💰</div>
          <div className="quick-stat-content">
            <div className="quick-stat-label">Monthly Income</div>
            <div className="quick-stat-amount">
              ₹
              {user.monthlyIncome?.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>

        <div className="quick-stat-card quick-stat-expense">
          <div className="quick-stat-icon">💸</div>
          <div className="quick-stat-content">
            <div className="quick-stat-label">Total Expenses</div>
            <div className="quick-stat-amount">
              ₹
              {monthlyExpenses.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="quick-stat-percentage">
              {((monthlyExpenses / user.monthlyIncome) * 100).toFixed(1)}% spent
            </div>
          </div>
        </div>

        <div
          className={`quick-stat-card ${remainingBudget < 0 ? 'quick-stat-balance-negative' : 'quick-stat-balance'}`}
        >
          <div className="quick-stat-icon">
            {remainingBudget < 0 ? '⚠️' : '✅'}
          </div>
          <div className="quick-stat-content">
            <div className="quick-stat-label">Remaining Balance</div>
            <div
              className={`quick-stat-amount ${remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}`}
            >
              ₹
              {remainingBudget.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="quick-stats-chart" ref={chartRef}>
        <div className="chart-wrapper">
          {chartType === 'bar' ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <defs>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '8px',
                  }}
                  formatter={(value: number) =>
                    `₹${value.toLocaleString('en-IN')}`
                  }
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: '20px',
                  }}
                />
                <Bar
                  dataKey="Expenses"
                  fill="url(#colorExpense)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="Balance"
                  fill="url(#colorBalance)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) =>
                    `${entry.name}: ₹${entry.value.toLocaleString('en-IN')}`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#ef4444" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip
                  formatter={(value: number) =>
                    `₹${value.toLocaleString('en-IN')}`
                  }
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <ExpenseFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};
