import React, { useState } from 'react';
import { Calendar, Download, Filter, User } from 'lucide-react';

const SalesReport: React.FC = () => {
  const [dateRange, setDateRange] = useState('today');
  const [selectedStaff, setSelectedStaff] = useState('');

  const salesData = [
    { id: 1, date: '2024-01-15', itemsSold: 8, revenue: 14200, profit: 6420, salesperson: 'John Kamau' },
    { id: 2, date: '2024-01-14', itemsSold: 12, revenue: 18600, profit: 8340, salesperson: 'Sarah Mwangi' },
    { id: 3, date: '2024-01-13', itemsSold: 6, revenue: 9800, profit: 4200, salesperson: 'Michael Ochieng' },
    { id: 4, date: '2024-01-12', itemsSold: 15, revenue: 22400, profit: 9680, salesperson: 'John Kamau' },
    { id: 5, date: '2024-01-11', itemsSold: 9, revenue: 16200, profit: 7240, salesperson: 'Sarah Mwangi' }
  ];

  const staffMembers = ['John Kamau', 'Sarah Mwangi', 'Michael Ochieng'];

  const filteredSales = salesData.filter(sale => {
    const matchesStaff = selectedStaff === '' || sale.salesperson === selectedStaff;
    return matchesStaff;
  });

  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.revenue, 0);
  const totalProfit = filteredSales.reduce((sum, sale) => sum + sale.profit, 0);
  const totalItems = filteredSales.reduce((sum, sale) => sum + sale.itemsSold, 0);

  const handleExport = (format: 'excel' | 'pdf') => {
    // Mock export functionality
    alert(`Exporting sales report as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Sales Report</h1>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="thisMonth">This month</option>
              <option value="lastMonth">Last month</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-400" />
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Staff</option>
              {staffMembers.map(staff => (
                <option key={staff} value={staff}>{staff}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2 ml-auto">
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Excel</span>
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">KES {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Profit</h3>
          <p className="text-3xl font-bold text-blue-600">KES {totalProfit.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Items Sold</h3>
          <p className="text-3xl font-bold text-purple-600">{totalItems}</p>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue (KES)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit (KES)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salesperson</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit Margin</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.map((sale) => {
                const profitMargin = ((sale.profit / sale.revenue) * 100).toFixed(1);
                return (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(sale.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.itemsSold}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      KES {sale.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      KES {sale.profit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.salesperson}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        parseFloat(profitMargin) > 50 ? 'bg-green-100 text-green-800' :
                        parseFloat(profitMargin) > 30 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {profitMargin}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;