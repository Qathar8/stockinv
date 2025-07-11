import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Package, DollarSign, ShoppingCart } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Today's Sales",
      value: "KES 14,200",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Items Sold Today",
      value: "23",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Current Stock Value",
      value: "KES 245,800",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Today's Profit",
      value: "KES 6,420",
      icon: TrendingUp,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    }
  ];

  const salesData = [
    { day: 'Mon', revenue: 8400, units: 12 },
    { day: 'Tue', revenue: 12600, units: 18 },
    { day: 'Wed', revenue: 10200, units: 15 },
    { day: 'Thu', revenue: 15800, units: 22 },
    { day: 'Fri', revenue: 14200, units: 20 },
    { day: 'Sat', revenue: 18200, units: 25 },
    { day: 'Sun', revenue: 11600, units: 16 }
  ];

  const topProducts = [
    { name: 'Premium Wool Suit', quantity: 8, revenue: 48000, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg' },
    { name: 'Leather Oxford Shoes', quantity: 12, revenue: 36000, image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg' },
    { name: 'Silk Tie Collection', quantity: 15, revenue: 22500, image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' },
    { name: 'Cotton Dress Shirt', quantity: 20, revenue: 20000, image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-600">
          Welcome back, John! Today is {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">7-Day Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'revenue' ? `KES ${value.toLocaleString()}` : value,
                name === 'revenue' ? 'Revenue' : 'Units'
              ]} />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Units Sold</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="units" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <p className="text-xs text-gray-600">{product.quantity} sold</p>
                <p className="text-sm font-semibold text-green-600">KES {product.revenue.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;