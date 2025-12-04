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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dbudget_user');

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUserState(parsedUser);

      // Load user-specific expenses using userId
      const userExpensesKey = `dbudget_expenses_${parsedUser.id}`;
      const savedExpenses = localStorage.getItem(userExpensesKey);

      if (savedExpenses) {
        const parsedExpenses = JSON.parse(savedExpenses).map((exp: any) => ({
          ...exp,
          date: new Date(exp.date),
          createdAt: new Date(exp.createdAt),
        }));
        setExpenses(parsedExpenses);
      }
    }
  }, []);

  // Save to localStorage whenever user changes
  const setUser = (newUser: User) => {
    setUserState(newUser);
    // Store user data
    localStorage.setItem('dbudget_user', JSON.stringify(newUser));
    // Initialize empty expenses array for new user
    const userExpensesKey = `dbudget_expenses_${newUser.id}`;
    if (!localStorage.getItem(userExpensesKey)) {
      localStorage.setItem(userExpensesKey, JSON.stringify([]));
    }
  };

  // Save to localStorage whenever expenses change
  const addExpense = (expense: Expense) => {
    if (!user) return;
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    // Save to user-specific key
    const userExpensesKey = `dbudget_expenses_${user.id}`;
    localStorage.setItem(userExpensesKey, JSON.stringify(updatedExpenses));
  };

  const deleteExpense = (id: string) => {
    if (!user) return;
    const updatedExpenses = expenses.filter((exp) => exp.id !== id);
    setExpenses(updatedExpenses);
    // Save to user-specific key
    const userExpensesKey = `dbudget_expenses_${user.id}`;
    localStorage.setItem(userExpensesKey, JSON.stringify(updatedExpenses));
  };

  const updateExpense = (id: string, updatedExpense: Expense) => {
    if (!user) return;
    const updatedExpenses = expenses.map((exp) =>
      exp.id === id ? updatedExpense : exp
    );
    setExpenses(updatedExpenses);
    // Save to user-specific key
    const userExpensesKey = `dbudget_expenses_${user.id}`;
    localStorage.setItem(userExpensesKey, JSON.stringify(updatedExpenses));
  };

  const getExpensesByDate = (date: Date): Expense[] => {
    return expenses.filter(
      (exp) => exp.date.toDateString() === date.toDateString()
    );
  };

  const getExpensesByMonth = (month: number, year: number): Expense[] => {
    // Accept `month` as 1-12 (UI callers pass new Date().getMonth() + 1)
    // Convert to JS Date month index (0-11) for comparison
    const monthIndex = month - 1;
    return expenses.filter(
      (exp) =>
        exp.date.getMonth() === monthIndex && exp.date.getFullYear() === year
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
    return getExpensesByMonth(month, year).reduce(
      (sum, exp) => sum + exp.amount,
      0
    );
  };

  const getRemainingBudget = (): number => {
    if (!user) return 0;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthlyExpenses = getMonthlyExpenses(currentMonth, currentYear);
    return user.monthlyIncome - monthlyExpenses;
  };

  const getExpensePercentage = (): number => {
    if (!user || user.monthlyIncome === 0) return 0;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthlyExpenses = getMonthlyExpenses(currentMonth, currentYear);
    return (monthlyExpenses / user.monthlyIncome) * 100;
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
