import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import RestaurantDashboard from './pages/RestaurantDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import AuthModal from './components/AuthModal';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Only show header for customers or when not logged in */}
      {(!user || user.role === 'customer') && (
        <Header onAuthClick={() => setShowAuthModal(true)} />
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        
        {/* Customer Dashboard */}
        <Route 
          path="/customer-dashboard" 
          element={
            <ProtectedRoute requiredRole="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Restaurant Dashboard */}
        <Route 
          path="/restaurant-dashboard" 
          element={
            <ProtectedRoute requiredRole="restaurant_owner">
              <RestaurantDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;