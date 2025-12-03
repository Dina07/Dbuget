import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { exportToImage } from '../../utils/exporters';
import '../../styles/base.css';

export const ExpenseCharts: React.FC = () => {
  const { expenses } = useAppContext();

  // Daily expenses for current month
  const dailyChartData = useMemo(() => {
    const dailyMap = new Map<string, number>();

    expenses.forEach((exp) => {
      const dateStr = exp.date.toLocaleDateString();
      dailyMap.set(dateStr, (dailyMap.get(dateStr) || 0) + exp.amount);
    });

    return Array.from(dailyMap, ([date, amount]) => ({
      date,
      amount: parseFloat(amount.toFixed(2)),
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [expenses]);

  // Category breakdown
  const categoryChartData = useMemo(() => {
    const categoryMap = new Map<string, number>();

    expenses.forEach((exp) => {
      categoryMap.set(exp.category, (categoryMap.get(exp.category) || 0) + exp.amount);
    });

    return Array.from(categoryMap, ([category, amount]) => ({
      name: category,
      value: parseFloat(amount.toFixed(2)),
    }));
  }, [expenses]);

  // Monthly totals
  const monthlyChartData = useMemo(() => {
    const monthlyMap = new Map<string, number>();

    expenses.forEach((exp) => {
      const monthStr = exp.date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
      monthlyMap.set(monthStr, (monthlyMap.get(monthStr) || 0) + exp.amount);
    });

    return Array.from(monthlyMap, ([month, amount]) => ({
      month,
      amount: parseFloat(amount.toFixed(2)),
    }));
  }, [expenses]);

  const COLORS = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#06B6D4',
  ];

  return (
    <div className="charts-container">
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Daily Expenses</h3>
          <button
            className="btn-export btn-export-image btn-sm"
            onClick={() => exportToImage('daily-chart', 'Daily_Expenses')}
            title="Export as Image"
          >
            Image
          </button>
        </div>
        <div id="daily-chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${(value as number).toFixed(2)}`} />
              <Bar dataKey="amount" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Monthly Expenses</h3>
          <button
            className="btn-export btn-export-image btn-sm"
            onClick={() => exportToImage('monthly-chart', 'Monthly_Expenses')}
            title="Export as Image"
          >
            Image
          </button>
        </div>
        <div id="monthly-chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${(value as number).toFixed(2)}`} />
              <Bar dataKey="amount" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Expenses by Category</h3>
          <button
            className="btn-export btn-export-image btn-sm"
            onClick={() => exportToImage('category-chart', 'Category_Breakdown')}
            title="Export as Image"
          >
            Image
          </button>
        </div>
        <div id="category-chart">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ₹${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryChartData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${(value as number).toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
