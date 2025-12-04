import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { User } from '../../types';
import '../../styles/base.css';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { setUser } = useAppContext();
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');
  const [errors, setErrors] = useState<{ name?: string; income?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; income?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!income || parseFloat(income) <= 0) {
      newErrors.income = 'Please enter a valid monthly income';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: name.trim(),
      monthlyIncome: parseFloat(income),
      createdAt: new Date(),
    };

    setUser(newUser);
    onComplete();
  };

  return (
    <div className="onboarding-wrapper">
      <div className="onboarding-container">
        <div className="onboarding-header">
          <h1 className="onboarding-title">💰 Welcome to DBudget</h1>
          <p className="onboarding-subtitle">
            Smart expense tracking & budget management for your financial goals
          </p>
        </div>

        <form onSubmit={handleSubmit} className="onboarding-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              👤 Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className={`form-input ${errors.name ? 'form-input-error' : ''}`}
            />
            {errors.name && (
              <span className="form-error">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="income" className="form-label">
              📈 Monthly Income
            </label>
            <p className="form-hint">Include salary, freelance, investments, etc.</p>
            <div className="form-input-wrapper">
              <span className="form-currency">₹</span>
              <input
                type="number"
                id="income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className={`form-input form-input-currency ${
                  errors.income ? 'form-input-error' : ''
                }`}
              />
            </div>
            {errors.income && (
              <span className="form-error">{errors.income}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Start Managing Budget 🚀
          </button>
        </form>

        <div className="onboarding-features">
          <h2 className="onboarding-features-title">✨ Key Features:</h2>
          <ul className="onboarding-features-list">
            <li className="onboarding-feature-item">
              <span className="onboarding-feature-icon">📊</span>
              <span>Smart categorization of daily expenses</span>
            </li>
            <li className="onboarding-feature-item">
              <span className="onboarding-feature-icon">📈</span>
              <span>Interactive charts (Daily, Monthly, Category)</span>
            </li>
            <li className="onboarding-feature-item">
              <span className="onboarding-feature-icon">📥</span>
              <span>Export reports as CSV, PDF, or PNG</span>
            </li>
            <li className="onboarding-feature-item">
              <span className="onboarding-feature-icon">💡</span>
              <span>Real-time budget tracking & insights</span>
            </li>
            <li className="onboarding-feature-item">
              <span className="onboarding-feature-icon">🔒</span>
              <span>Secure local storage (no cloud)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
