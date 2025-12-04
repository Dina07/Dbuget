import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ConfirmationModal } from '../Common/ConfirmationModal';
import '../../styles/base.css';

type SortType = 'date' | 'amount';

export const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense } = useAppContext();
  const [sortBy, setSortBy] = useState<SortType>('date');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.amount - a.amount;
    }
  });

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteExpense(deleteId);
      setDeleteId(null);
    }
  };

  const totalAmount = sortedExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="expense-list-container">
      <div className="expense-list-header">
        <span>📋 Expense History</span>
        <div className="expense-list-controls">
          <button
            className={`sort-button ${sortBy === 'date' ? 'active' : ''}`}
            onClick={() => setSortBy('date')}
          >
            📅 By Date
          </button>
          <button
            className={`sort-button ${sortBy === 'amount' ? 'active' : ''}`}
            onClick={() => setSortBy('amount')}
          >
            💰 By Amount
          </button>
        </div>
      </div>

      <div className="expense-table-header">
        <div>📅 Date</div>
        <div>🏷️ Category</div>
        <div>📝 Description</div>
        <div>💵 Amount</div>
        <div>⚡ Action</div>
      </div>

      {sortedExpenses.length === 0 ? (
        <div className="expense-empty-state">
          No expenses added yet. Start tracking your spending! 💪
        </div>
      ) : (
        <>
          {sortedExpenses.map((expense) => (
            <div key={expense.id} className="expense-table">
              <div className="expense-col-date">
                {new Date(expense.date).toLocaleDateString('en-IN')}
              </div>
              <div className="expense-col-category">
                <span className="expense-badge">{expense.category}</span>
              </div>
              <div className="expense-col-description">
                {expense.description || '-'}
              </div>
              <div className="expense-col-amount">
                ₹
                {expense.amount.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="expense-col-action">
                <button
                  className="btn-delete"
                  onClick={() => setDeleteId(expense.id)}
                  title="Delete expense"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          <div className="expense-total">
            <div className="expense-total-label">Total Expenses:</div>
            <div></div>
            <div></div>
            <div className="expense-total-amount">
              ₹
              {totalAmount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div></div>
          </div>
        </>
      )}

      {deleteId && (
        <ConfirmationModal
          title="Delete Expense"
          message="Are you sure you want to delete this expense? This action cannot be undone."
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
          isDangerous={true}
        />
      )}
    </div>
  );
};
