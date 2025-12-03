# Personal Budget & Expenses Tracker

A lightweight web app for tracking personal budgets and expenses, built with React, Tailwind CSS, and TypeScript.

## Features
- Add, edit, and remove income and expense entries
- Categorize transactions
- View current balance and totals
- Responsive UI with Tailwind CSS
- Type-safe codebase using TypeScript

## Tech Stack
- React
- TypeScript
- Tailwind CSS
- Vite / Create React App (whichever your project uses)

## Getting Started

Prerequisites:
- Node.js (16+)
- npm or Yarn

Install dependencies:
``sh
npm install
# or
yarn
``

Run in development:
``sh
npm run dev
# or
npm start
``

Build for production:
``sh
npm run build
``

Run tests (if configured):
``sh
npm test
``

## Project Structure

``
DBudget/
+-- public/
¦   +-- index.html
¦   +-- favicon.ico
+-- src/
¦   +-- components/
¦   ¦   +-- Budget/
¦   ¦   ¦   +-- BudgetForm.tsx
¦   ¦   ¦   +-- BudgetList.tsx
¦   ¦   ¦   +-- BudgetCard.tsx
¦   ¦   +-- Expenses/
¦   ¦   ¦   +-- ExpenseForm.tsx
¦   ¦   ¦   +-- ExpenseList.tsx
¦   ¦   ¦   +-- ExpenseItem.tsx
¦   ¦   +-- Dashboard/
¦   ¦   ¦   +-- Summary.tsx
¦   ¦   ¦   +-- Chart.tsx
¦   ¦   +-- Common/
¦   ¦   ¦   +-- Header.tsx
¦   ¦   ¦   +-- Sidebar.tsx
¦   ¦   ¦   +-- Footer.tsx
¦   ¦   +-- Layout.tsx
¦   +-- pages/
¦   ¦   +-- Home.tsx
¦   ¦   +-- Budget.tsx
¦   ¦   +-- Expenses.tsx
¦   ¦   +-- Reports.tsx
¦   +-- hooks/
¦   ¦   +-- useBudget.ts
¦   ¦   +-- useExpenses.ts
¦   ¦   +-- useLocalStorage.ts
¦   +-- types/
¦   ¦   +-- budget.ts
¦   ¦   +-- expense.ts
¦   ¦   +-- common.ts
¦   +-- context/
¦   ¦   +-- BudgetContext.tsx
¦   ¦   +-- ExpenseContext.tsx
¦   +-- utils/
¦   ¦   +-- calculations.ts
¦   ¦   +-- formatters.ts
¦   ¦   +-- validators.ts
¦   +-- styles/
¦   ¦   +-- tailwind.config.js
¦   ¦   +-- globals.css
¦   +-- App.tsx
¦   +-- main.tsx
+-- .gitignore
+-- package.json
+-- tsconfig.json
+-- tailwind.config.js
+-- postcss.config.js
+-- vite.config.ts
+-- README.md
``

### Directory Details

- **public/** - Static assets and index.html
- **src/components/** - Reusable UI components organized by feature
  - Budget/ - Budget management components
  - Expenses/ - Expense tracking components
  - Dashboard/ - Summary and visualization components
  - Common/ - Shared layout components
- **src/pages/** - Page-level views and routes
- **src/hooks/** - Custom React hooks for business logic
- **src/types/** - TypeScript type definitions and interfaces
- **src/context/** - React Context for state management
- **src/utils/** - Utility functions (calculations, formatting, validation)
- **src/styles/** - Tailwind CSS configuration and global styles

## Contributing
- Fork the repo, create a feature branch, and open a pull request.
- Keep changes small and include tests where applicable.

## License
MIT
