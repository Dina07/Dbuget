import React from 'react';
import { Summary } from '../components/Dashboard/Summary';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
      <Summary />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Salary</p>
                <p className="text-sm text-gray-500">Income</p>
              </div>
              <span className="text-green-600 font-semibold">+$5,000</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Groceries</p>
                <p className="text-sm text-gray-500">Food & Drink</p>
              </div>
              <span className="text-red-600 font-semibold">-$150</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Utilities</p>
                <p className="text-sm text-gray-500">Bills</p>
              </div>
              <span className="text-red-600 font-semibold">-$200</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition">
              + Add Income
            </button>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition">
              + Add Expense
            </button>
            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition">
              View Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
