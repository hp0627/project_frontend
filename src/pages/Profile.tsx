import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, MapPin, Phone } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="text-8xl mb-4">👤</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Please sign in</h2>
          <p className="text-gray-600">You need to be signed in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium">
                    {user.full_name || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-400">Not provided</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-400">Not provided</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Orders</span>
                <span className="font-semibold">23</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Favorite Cuisine</span>
                <span className="font-semibold">Italian</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Money Saved</span>
                <span className="font-semibold text-green-600">$47.50</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
            
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Email notifications</span>
              </label>
              
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                <span className="ml-2 text-sm text-gray-700">SMS notifications</span>
              </label>
              
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Order updates</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;