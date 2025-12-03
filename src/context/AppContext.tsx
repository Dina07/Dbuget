import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Expense, ExpenseCategory } from '../types';

interface AppContextType {
  user: User | null;
  expenses: Expense[];
  setUser: (user: User) => void;
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Expense) => void;
  getExpensesByDate: (date: Date) => Expense[];
  getExpensesByMonth: (month: number, year: number) => Expense[];
  getTotalByCategory: (category: ExpenseCategory) => number;
  getTotalExpenses: () => number;
  getMonthlyExpenses: (month: number, year: number) => number;
  getRemainingBudget: () => number;
  getExpensePercentage: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dbudget_user');
    const savedExpenses = localStorage.getItem('dbudget_expenses');

    if (savedUser) {
      setUserState(JSON.parse(savedUser));
    }

    if (savedExpenses) {
      const parsedExpenses = JSON.parse(savedExpenses).map((exp: any) => ({
        ...exp,
        date: new Date(exp.date),
        createdAt: new Date(exp.createdAt),
      }));
      setExpenses(parsedExpenses);
    }
  }, []);

  // Save to localStorage whenever user changes
  const setUser = (newUser: User) => {
    setUserState(newUser);
    localStorage.setItem('dbudget_user', JSON.stringify(newUser));
  };

  // Save to localStorage whenever expenses change
  const addExpense = (expense: Expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    localStorage.setItem('dbudget_expenses', JSON.stringify(updatedExpenses));
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter((exp) => exp.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem('dbudget_expenses', JSON.stringify(updatedExpenses));
  };

  const updateExpense = (id: string, updatedExpense: Expense) => {
    const updatedExpenses = expenses.map((exp) =>
      exp.id === id ? updatedExpense : exp
    );
    setExpenses(updatedExpenses);
    localStorage.setItem('dbudget_expenses', JSON.stringify(updatedExpenses));
  };

  const getExpensesByDate = (date: Date): Expense[] => {
    return expenses.filter(
      (exp) =>
        exp.date.toDateString() === date.toDateString()
    );
  };

  const getExpensesByMonth = (month: number, year: number): Expense[] => {
    return expenses.filter(
      (exp) =>
        exp.date.getMonth() === month &&
        exp.date.getFullYear() === year
    );
  };

  const getTotalByCategory = (category: ExpenseCategory): number => {
    return expenses
      .filter((exp) => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getTotalExpenses = (): number => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getMonthlyExpenses = (month: number, year: number): number => {
    return getExpensesByMonth(month, year).reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getRemainingBudget = (): number => {
    if (!user) return 0;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyTotal = getMonthlyExpenses(currentMonth, currentYear);
    return user.monthlySalary - monthlyTotal;
  };

  const getExpensePercentage = (): number => {
    if (!user || user.monthlySalary === 0) return 0;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyTotal = getMonthlyExpenses(currentMonth, currentYear);
    return (monthlyTotal / user.monthlySalary) * 100;
  };

  const value: AppContextType = {
    user,
    expenses,
    setUser,
    addExpense,
    deleteExpense,
    updateExpense,
    getExpensesByDate,
    getExpensesByMonth,
    getTotalByCategory,
    getTotalExpenses,
    getMonthlyExpenses,
    getRemainingBudget,
    getExpensePercentage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
