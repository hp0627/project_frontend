import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard,
  Bell,
  Settings,
  Star,
  Clock
} from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const mockOrders = [
    {
      id: '1',
      restaurant: 'Bella Italia',
      items: ['Margherita Pizza', 'Caesar Salad'],
      total: 31.98,
      status: 'delivered',
      date: '2024-01-15',
      rating: 5
    },
    {
      id: '2',
      restaurant: 'Sushi Master',
      items: ['California Roll', 'Miso Soup'],
      total: 24.99,
      status: 'delivered',
      date: '2024-01-14',
      rating: 4
    }
  ];

  const mockFavorites = [
    {
      id: '1',
      name: 'Bella Italia',
      cuisine: 'Italian',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Sushi Master',
      cuisine: 'Japanese',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={user?.full_name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
              disabled
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">23</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">$487</div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600">Favorite Restaurants</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
      
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{order.restaurant}</h3>
                <p className="text-sm text-gray-600">Order #{order.id} • {order.date}</p>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">${order.total}</div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Items:</p>
                  <p className="text-sm">{order.items.join(', ')}</p>
                </div>
                
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < order.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex space-x-3">
                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                  Reorder
                </button>
                <button className="text-gray-600 hover:text-gray-700 font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Favorite Restaurants</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFavorites.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-32 object-cover"
            />
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                <button className="text-red-500 hover:text-red-600">
                  <Heart className="h-5 w-5 fill-current" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
              
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{restaurant.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">My Account</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.full_name}</p>
              </div>
            </div>
            
            <button
              onClick={signOut}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-orange-100 text-orange-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'favorites' && renderFavorites()}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Addresses</h2>
                <p className="text-gray-600">Address management coming soon...</p>
              </div>
            )}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Methods</h2>
                <p className="text-gray-600">Payment method management coming soon...</p>
              </div>
            )}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                <p className="text-gray-600">Notification settings coming soon...</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
                <p className="text-gray-600">Account settings coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;