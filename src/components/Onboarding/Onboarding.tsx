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
  const [salary, setSalary] = useState('');
  const [errors, setErrors] = useState<{ name?: string; salary?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; salary?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!salary || parseFloat(salary) <= 0) {
      newErrors.salary = 'Please enter a valid monthly salary';
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
      monthlySalary: parseFloat(salary),
      createdAt: new Date(),
    };

    setUser(newUser);
    onComplete();
  };

  return (
    <div className="onboarding-wrapper">
      <div className="onboarding-container">
        <div className="onboarding-header">
          <h1 className="onboarding-title">Welcome to DBudget</h1>
          <p className="onboarding-subtitle">
            Track your daily expenses and manage your budget efficiently
          </p>
        </div>

        <form onSubmit={handleSubmit} className="onboarding-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Your Name
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
            <label htmlFor="salary" className="form-label">
              Monthly Salary
            </label>
            <div className="form-input-wrapper">
              <span className="form-currency">₹</span>
              <input
                type="number"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className={`form-input form-input-currency ${
                  errors.salary ? 'form-input-error' : ''
                }`}
              />
            </div>
            {errors.salary && (
              <span className="form-error">{errors.salary}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Get Started
          </button>
        </form>

        <div className="onboarding-features">
          <h2 className="onboarding-features-title">What you can do:</h2>
          <ul className="onboarding-features-list">
            <li className="onboarding-feature-item">
              <span className="onboarding-feature-icon">📊</span>
              <span>Track daily, monthly, and yearly expenses</span>
            </li>
            <li className="onboarding-feature-item">
              <span className="onboarding-feature-icon">📈</span>
              <span>View detailed charts and analytics</span>
            </li>
            <li className="onboarding-feature-item">
              <span className="onboarding-feature-icon">📥</span>
              <span>Download reports as CSV, PDF, or Image</span>
            </li>
            <li className="onboarding-feature-item">
              <span className="onboarding-feature-icon">💰</span>
              <span>Categorize expenses by type</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
