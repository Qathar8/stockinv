import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import StockIn from './components/StockIn/StockIn';
import Inventory from './components/Inventory/Inventory';
import SalesReport from './components/SalesReport/SalesReport';
import ProfitSummary from './components/ProfitSummary/ProfitSummary';
import ProductCatalog from './components/ProductCatalog/ProductCatalog';
import UserManagement from './components/UserManagement/UserManagement';
import Settings from './components/Settings/Settings';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="stock-in" element={<StockIn />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="sales-report" element={<SalesReport />} />
        <Route path="profit-summary" element={<ProfitSummary />} />
        <Route path="product-catalog" element={<ProductCatalog />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;