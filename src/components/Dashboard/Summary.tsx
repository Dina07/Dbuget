import React from 'react';

export const Summary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <h3 className="text-gray-600 text-sm font-semibold uppercase">Total Income</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">$5,000</p>
        <p className="text-xs text-gray-500 mt-2">This month</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
        <h3 className="text-gray-600 text-sm font-semibold uppercase">Total Expenses</h3>
        <p className="text-3xl font-bold text-red-600 mt-2">$2,300</p>
        <p className="text-xs text-gray-500 mt-2">This month</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
        <h3 className="text-gray-600 text-sm font-semibold uppercase">Balance</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">$2,700</p>
        <p className="text-xs text-gray-500 mt-2">Remaining</p>
      </div>
    </div>
  );
};
