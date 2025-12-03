import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ConfirmationModal } from '../Common/ConfirmationModal';
import '../../styles/base.css';

export const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense } = useAppContext();
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; expenseId: string | null }>({
    isOpen: false,
    expenseId: null,
  });

  const handleDeleteClick = (expenseId: string) => {
    setDeleteModal({
      isOpen: true,
      expenseId,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.expenseId) {
      deleteExpense(deleteModal.expenseId);
      setDeleteModal({
        isOpen: false,
        expenseId: null,
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({
      isOpen: false,
      expenseId: null,
    });
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.amount - a.amount;
    }
  });

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">No expenses yet. Add your first expense above!</p>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <div className="expense-list-header">
        <h2 className="expense-list-title">Expense History</h2>
        <div className="expense-list-controls">
          <label htmlFor="sort-select" className="form-label">
            Sort By:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
            className="form-input"
          >
            <option value="date">Date (Newest First)</option>
            <option value="amount">Amount (Highest First)</option>
          </select>
        </div>
      </div>

      <div className="expense-table">
        <div className="expense-table-header">
          <div className="expense-col-date">Date</div>
          <div className="expense-col-category">Category</div>
          <div className="expense-col-description">Description</div>
          <div className="expense-col-amount">Amount</div>
          <div className="expense-col-action">Action</div>
        </div>

        {sortedExpenses.map((expense) => (
          <div key={expense.id} className="expense-table-row">
            <div className="expense-col-date">
              {new Date(expense.date).toLocaleDateString()}
            </div>
            <div className="expense-col-category">
              <span className="expense-badge">{expense.category}</span>
            </div>
            <div className="expense-col-description">
              {expense.description || '-'}
            </div>
            <div className="expense-col-amount">
              <span className="expense-amount">
                ₹{expense.amount.toFixed(2)}
              </span>
            </div>
            <div className="expense-col-action">
              <button
                onClick={() => handleDeleteClick(expense.id)}
                className="btn-delete"
                title="Delete expense"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="expense-list-footer">
        <p className="expense-total">
          Total Expenses: <strong>₹{sortedExpenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}</strong>
        </p>
      </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Expense"
        message="Are you sure you want to delete this expense? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};
