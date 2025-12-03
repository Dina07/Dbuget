import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Expense, ExpenseCategory } from '../../types';
import '../../styles/base.css';

interface ExpenseFormProps {
  onExpenseAdded?: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onExpenseAdded }) => {
  const { addExpense } = useAppContext();
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.OTHER);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState<{
    amount?: string;
    category?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { amount?: string; category?: string } = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!category) {
      newErrors.category = 'Please select a category';
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
      userId: 'default',
      category,
      amount: parseFloat(amount),
      description: description.trim(),
      date: new Date(date),
      createdAt: new Date(),
    };

    addExpense(newExpense);

    // Reset form
    setCategory(ExpenseCategory.OTHER);
    setAmount('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setErrors({});

    if (onExpenseAdded) {
      onExpenseAdded();
    }
  };

  return (
    <div className="expense-form-card">
      <h2 className="expense-form-title">Add New Expense</h2>

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <div className="form-group form-group-half">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group form-group-half">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className={`form-input ${
                errors.category ? 'form-input-error' : ''
              }`}
            >
              <option value="">Select a category</option>
              {Object.values(ExpenseCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="form-error">{errors.category}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group form-group-half">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <div className="form-input-wrapper">
              <span className="form-currency">₹</span>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className={`form-input form-input-currency ${
                  errors.amount ? 'form-input-error' : ''
                }`}
              />
            </div>
            {errors.amount && (
              <span className="form-error">{errors.amount}</span>
            )}
          </div>

          <div className="form-group form-group-half">
            <label htmlFor="description" className="form-label">
              Description (Optional)
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes about this expense"
              className="form-input"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          + Add Expense
        </button>
      </form>
    </div>
  );
};
