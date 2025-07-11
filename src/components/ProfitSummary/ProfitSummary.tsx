import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProfitSummary: React.FC = () => {
  const profitData = [
    { day: 'Mon', profit: 4200 },
    { day: 'Tue', profit: 6300 },
    { day: 'Wed', profit: 5100 },
    { day: 'Thu', profit: 7900 },
    { day: 'Fri', profit: 6420 },
    { day: 'Sat', profit: 9100 },
    { day: 'Sun', profit: 5800 }
  ];

  const productProfitData = [
    {
      name: 'Premium Wool Suit',
      unitsSold: 8,
      revenue: 54400,
      totalCost: 36000,
      profit: 18400,
      margin: 33.8
    },
    {
      name: 'Leather Oxford Shoes',
      unitsSold: 12,
      revenue: 50400,
      totalCost: 33600,
      profit: 16800,
      margin: 33.3
    },
    {
      name: 'Cotton Dress Shirt',
      unitsSold: 20,
      revenue: 24000,
      totalCost: 16000,
      profit: 8000,
      margin: 33.3
    },
    {
      name: 'Silk Tie Collection',
      unitsSold: 15,
      revenue: 27000,
      totalCost: 18000,
      profit: 9000,
      margin: 33.3
    },
    {
      name: 'Leather Belt',
      unitsSold: 18,
      revenue: 18000,
      totalCost: 14400,
      profit: 3600,
      margin: 20.0
    }
  ];

  const getMarginColor = (margin: number) => {
    if (margin > 40) return 'bg-green-100 text-green-800';
    if (margin > 25) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getMarginRowColor = (margin: number) => {
    if (margin > 40) return 'bg-green-50';
    if (margin > 25) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Profit Summary</h1>
      </div>

      {/* Weekly Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Profit Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => [`KES ${value.toLocaleString()}`, 'Profit']} />
            <Bar dataKey="profit" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product Profit Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Profit Analysis</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue (KES)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost (KES)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit (KES)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit Margin</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productProfitData.map((product, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${getMarginRowColor(product.margin)}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.unitsSold}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    KES {product.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    KES {product.totalCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    KES {product.profit.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMarginColor(product.margin)}`}>
                      {product.margin}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Weekly Profit</h3>
          <p className="text-3xl font-bold text-green-600">
            KES {profitData.reduce((sum, day) => sum + day.profit, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Daily Profit</h3>
          <p className="text-3xl font-bold text-blue-600">
            KES {Math.round(profitData.reduce((sum, day) => sum + day.profit, 0) / profitData.length).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Day This Week</h3>
          <p className="text-3xl font-bold text-purple-600">Saturday</p>
          <p className="text-sm text-gray-600">KES 9,100</p>
        </div>
      </div>
    </div>
  );
};

export default ProfitSummary;