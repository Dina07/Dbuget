# DBudget - Personal Budget & Expenses Tracker

A comprehensive personal budget and expense tracking application built with React, TypeScript, and Tailwind CSS. Track your daily expenses, visualize spending patterns, and manage your budget with ease. Perfect for Indian users with support for Indian Rupee (₹) currency.

## ✨ Features

### Core Functionality
- **Expense Tracking**: Add daily expenses with date, category, and description
- **Budget Management**: Set monthly salary and track remaining balance
- **Category Management**: 12 pre-configured expense categories (Food, Transport, Entertainment, etc.)
- **Real-time Calculations**: Automatic balance and percentage calculations
- **Data Persistence**: All data stored in browser's localStorage for offline access

### Dashboard & Analytics
- **Summary Cards**: Monthly income, total expenses, and balance at a glance
- **Quick Stats**: Bar chart visualization comparing expenses vs remaining balance
- **Expense Charts**: 
  - Daily expense trends
  - Monthly expense breakdown
  - Category-wise expense distribution (Pie chart)
- **Export Functionality**: Export data as CSV, PDF, or PNG image

### User Experience
- **Onboarding Flow**: First-time user setup with name and monthly salary
- **Mobile Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Delete Confirmation**: Safety modal for confirming expense deletion
- **User Authentication**: Login/Logout with persistent user sessions
- **Currency Localization**: Indian Rupee (₹) formatting throughout the app

## 🛠️ Tech Stack

| Category | Technology |
|----------|-------------|
| **Frontend Framework** | React 18.2.0 |
| **Language** | TypeScript 5.3.3 |
| **Styling** | Tailwind CSS 3.3.6 |
| **Build Tool** | Vite 5.4.21 |
| **Charts** | Recharts 3.5.1 |
| **Export** | jsPDF 3.0.4, html2canvas 1.4.1 |
| **State Management** | React Context API + localStorage |
| **CSS Processing** | PostCSS, Autoprefixer |
| **Code Quality** | ESLint, Prettier |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or Yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Dina07/Dbuget.git
cd Dbuget/web

# Install dependencies
npm install
```

### Development

```bash
# Start development server (runs on http://localhost:5173)
npm run dev
```

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Run ESLint to check code quality
npm run lint

# Format code with Prettier
npm run format
```

## 📁 Project Structure

```
DBudget/web/
├── public/
│   ├── image/
│   │   └── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Budget/                    # Budget management components
│   │   ├── Common/
│   │   │   ├── ConfirmationModal.tsx  # Reusable delete confirmation modal
│   │   │   ├── Footer.tsx             # Application footer
│   │   │   ├── Header.tsx             # App header with user greeting
│   │   │   └── Layout.tsx             # Main layout wrapper
│   │   ├── Dashboard/
│   │   │   ├── ExpenseCharts.tsx      # Multiple chart visualizations
│   │   │   ├── QuickStats.tsx         # Bar chart with export buttons
│   │   │   └── Summary.tsx            # Income, expenses, balance cards
│   │   ├── Expenses/
│   │   │   ├── ExpenseForm.tsx        # Add expense form with categories
│   │   │   └── ExpenseList.tsx        # Display & manage expenses
│   │   └── Onboarding/
│   │       └── Onboarding.tsx         # First-time user setup
│   ├── context/
│   │   └── AppContext.tsx             # Global state management with localStorage
│   ├── pages/
│   │   └── Home.tsx                   # Home page
│   ├── hooks/                         # Custom React hooks (for future use)
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces and types
│   ├── utils/
│   │   └── exporters.ts               # CSV, PDF, Image export functions
│   ├── styles/
│   │   └── base.css                   # Global styles with Tailwind + responsive
│   ├── App.tsx                        # Main App component
│   └── main.tsx                       # App entry point
├── dist/                              # Production build (generated)
├── node_modules/                      # Dependencies
├── .eslintrc.cjs                      # ESLint configuration
├── .editorconfig                      # Editor configuration
├── .prettierrc                        # Prettier configuration
├── .prettierignore                    # Prettier ignore patterns
├── .gitignore                         # Git ignore rules
├── .vscode/
│   ├── extensions.json                # Recommended VS Code extensions
│   └── settings.json                  # VS Code settings
├── index.html                         # HTML template
├── package.json                       # Project dependencies & scripts
├── postcss.config.js                  # PostCSS configuration
├── tailwind.config.js                 # Tailwind CSS configuration
├── tsconfig.json                      # TypeScript configuration
├── tsconfig.node.json                 # TypeScript config for Vite
├── vite.config.ts                     # Vite build configuration
└── Readme.md                          # Project documentation
```

### Key Directories Explained

| Directory | Purpose |
|-----------|---------|
| **src/components/** | Reusable React components organized by feature domain |
| **src/context/** | React Context API for global state management & localStorage |
| **src/types/** | TypeScript interfaces: User, Expense, Category, ChartData |
| **src/utils/** | Utility functions for CSV/PDF/Image exports |
| **src/styles/** | Global CSS with Tailwind utilities & responsive media queries |
| **dist/** | Production-ready build output |

## 📊 Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  monthlySalary: number;
}
```

### Expense
```typescript
interface Expense {
  id: string;
  date: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  userId: string;
}
```

### Supported Categories
Food, Transport, Entertainment, Shopping, Bills, Medical, Education, Utilities, Subscriptions, Gifts, Travel, Other

## 🎨 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile** (≤768px): Single column layouts, stacked navigation
- **Tablet** (≤1024px): Optimized for medium screens
- **Desktop** (≥1025px): Multi-column grid layouts

Mobile-first CSS approach using Tailwind breakpoints (sm:, md:, lg:)

## 💾 Data Persistence

All data is stored in browser's localStorage under these keys:
- `dbudget_user` - User profile (name, salary)
- `dbudget_expenses` - Array of all expenses

Data persists across browser sessions and is cleared only on logout.

## 📤 Export Functionality

### CSV Export
- Includes complete expense history
- Summary statistics (total, categories, average)
- Compatible with Excel and Google Sheets

### PDF Export
- Formatted expense report with styling
- Auto-paginating for large datasets
- Includes summary section with charts

### Image Export
- High-resolution PNG of chart visualizations
- Perfect for sharing on social media

## 🔐 User Authentication

- Simple login system with user name and monthly salary
- Session persists in localStorage
- Logout clears all data and returns to onboarding

## 🎯 Future Enhancements

- [ ] Budget alerts and notifications
- [ ] Recurring expense templates
- [ ] Multi-user support with cloud sync
- [ ] Advanced filtering and search
- [ ] Budget goals and targets
- [ ] Spending recommendations based on patterns
- [ ] Dark mode theme
- [ ] Mobile app (React Native)

## 📝 Configuration Files

### `.prettierrc`
Code formatting configuration with TypeScript support. Ensures consistent code style across the project.

### `.editorconfig`
Editor configuration for consistent indentation and line endings across different editors.

### `.vscode/`
VS Code specific settings:
- **settings.json** - Auto-format on save with Prettier
- **extensions.json** - Recommended extensions (Prettier, ESLint, Tailwind CSS IntelliSense)

### `tsconfig.json`
TypeScript compiler options with strict mode enabled for type safety.

### `tailwind.config.js`
Tailwind CSS configuration with content paths for proper class purging.

### `postcss.config.js`
PostCSS plugins for Tailwind CSS and Autoprefixer integration.

### `vite.config.ts`
Vite build configuration with React plugin and optimization settings.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created and maintained by [Dina07](https://github.com/Dina07)

## 🎉 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for utility-first styling
- Recharts for beautiful chart components
- Vite for the blazing fast build tool
