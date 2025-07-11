import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Shirt, 
  Users, 
  Settings,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: PlusCircle, label: 'Stock In', path: '/stock-in' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: ShoppingCart, label: 'Sales Report', path: '/sales-report' },
    { icon: TrendingUp, label: 'Profit Summary', path: '/profit-summary' },
    { icon: Shirt, label: 'Product Catalog', path: '/product-catalog' },
    { icon: Users, label: 'User Management', path: '/user-management', adminOnly: true },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const filteredItems = navigationItems.filter(item => {
    if (item.adminOnly && user?.role === 'Sales Staff') {
      return false;
    }
    return true;
  });

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-gold-500 rounded-lg flex items-center justify-center">
            <Shirt className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Gents by Elegante</h1>
            <p className="text-xs text-gray-400">Inventory System</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {filteredItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;