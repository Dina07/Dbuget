// User and Budget Types
export interface User {
  id: string;
  name: string;
  monthlyIncome: number;
  createdAt: Date;
}

export interface Expense {
  id: string;
  userId: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  date: Date;
  createdAt: Date;
}

export enum ExpenseCategory {
  EMI = 'EMI',
  BIKE = 'Bike',
  PETROL = 'Petrol',
  REPAIR = 'Repair',
  CLOTH = 'Cloth',
  MOVIES = 'Movies',
  TRAVEL = 'Travel',
  GROCERY = 'Grocery',
  FOOD = 'Food & Snacks',
  HOME = 'Home & Kitchen',
  UTILITIES = 'Utilities',
  OTHER = 'Other',
}

export interface DailyExpense {
  date: Date;
  total: number;
  expenses: Expense[];
}

export interface MonthlyExpense {
  month: number;
  year: number;
  total: number;
}

export interface YearlyExpense {
  year: number;
  total: number;
}

export interface ChartData {
  label: string;
  value: number;
  category?: string;
}

export interface ExportReport {
  user: User;
  totalExpenses: number;
  averageDaily: number;
  averageMonthly: number;
  expenses: Expense[];
  generatedAt: Date;
}
