import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p>&copy; 2025 DBudget. Personal Budget & Expenses Tracker.</p>
          <p className="text-sm text-gray-400 mt-2">Built with React, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};
