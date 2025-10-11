import React from 'react';
import { Clock, CheckCircle, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Order {
  id: string;
  restaurantName: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: 'preparing' | 'on-the-way' | 'delivered';
  orderTime: string;
  deliveryTime?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    restaurantName: 'Bella Italia',
    items: [
      { name: 'Margherita Pizza', quantity: 1 },
      { name: 'Caesar Salad', quantity: 1 }
    ],
    total: 31.98,
    status: 'on-the-way',
    orderTime: '2024-01-15 18:30',
    deliveryTime: '19:00'
  },
  {
    id: '2',
    restaurantName: 'Sushi Master',
    items: [
      { name: 'California Roll', quantity: 2 },
      { name: 'Miso Soup', quantity: 1 }
    ],
    total: 24.99,
    status: 'delivered',
    orderTime: '2024-01-14 12:15',
    deliveryTime: '12:45'
  },
  {
    id: '3',
    restaurantName: 'Burger House',
    items: [
      { name: 'Classic Burger', quantity: 1 },
      { name: 'Fries', quantity: 1 }
    ],
    total: 18.50,
    status: 'delivered',
    orderTime: '2024-01-13 19:20',
    deliveryTime: '19:50'
  }
];

const Orders: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="text-8xl mb-4">📦</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Please sign in</h2>
          <p className="text-gray-600">You need to be signed in to view your orders.</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'on-the-way':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'Preparing';
      case 'on-the-way':
        return 'On the way';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'on-the-way':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">My Orders</h1>

      {mockOrders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-8xl mb-4">📦</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-8">When you place your first order, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {order.restaurantName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Order #{order.id} • {new Date(order.orderTime).toLocaleDateString()} at{' '}
                    {new Date(order.orderTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>

                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <span>{getStatusText(order.status)}</span>
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Items ordered:</h4>
                    <ul className="space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {item.quantity}x {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total:</span>
                      <span className="font-semibold">${order.total.toFixed(2)}</span>
                    </div>
                    
                    {order.deliveryTime && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          {order.status === 'delivered' ? 'Delivered at:' : 'Expected delivery:'}
                        </span>
                        <span className="text-sm font-medium">
                          {new Date(order.orderTime.split(' ')[0] + ' ' + order.deliveryTime).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-3">
                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors">
                  Reorder
                </button>
                
                {order.status === 'delivered' && (
                  <button className="text-gray-600 hover:text-gray-700 font-medium text-sm transition-colors">
                    Rate & Review
                  </button>
                )}
                
                {order.status !== 'delivered' && (
                  <button className="text-gray-600 hover:text-gray-700 font-medium text-sm transition-colors">
                    Track Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;