import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Expense, ExpenseCategory } from '../../types';
import '../../styles/base.css';

interface ExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EXPENSE_CATEGORIES = Object.values(ExpenseCategory);

export const ExpenseFormModal: React.FC<ExpenseFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addExpense, user } = useAppContext();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<ExpenseCategory>(
    ExpenseCategory.FOOD
  );
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ amount?: string }>({});

  const validateForm = () => {
    const newErrors: { amount?: string } = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      date: new Date(date),
      category,
      amount: parseFloat(amount),
      description: description.trim(),
      userId: user?.id || 'unknown',
      createdAt: new Date(),
    };

    addExpense(newExpense);

    // Reset form
    setDate(new Date().toISOString().split('T')[0]);
    setCategory(ExpenseCategory.FOOD);
    setAmount('');
    setDescription('');
    setErrors({});

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-form-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">➕ Add New Expense</h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-form-group">
            <label htmlFor="date" className="form-label">
              📅 Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="modal-form-group">
            <label htmlFor="category" className="form-label">
              🏷️ Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="form-input"
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-form-group">
            <label htmlFor="amount" className="form-label">
              💰 Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className={`form-input ${errors.amount ? 'form-input-error' : ''}`}
            />
            {errors.amount && (
              <span className="form-error">{errors.amount}</span>
            )}
          </div>

          <div className="modal-form-group">
            <label htmlFor="description" className="form-label">
              📝 Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a note about this expense..."
              className="form-input form-textarea"
              rows={3}
            />
          </div>

          <div className="modal-form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              💾 Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
