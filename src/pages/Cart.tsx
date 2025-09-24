import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const subtotal = state.total;
  const deliveryFee = subtotal > 30 ? 0 : 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Continue shopping</span>
        </Link>

        <div className="text-center py-16">
          <div className="text-8xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious items to get started!</p>
          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Continue shopping</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Your Order</h1>

          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.restaurantName}</p>
                    <p className="text-lg font-bold text-orange-600">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                ${deliveryFee === 0 ? '0.00 (Free!)' : deliveryFee.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <hr className="my-4" />
            
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {deliveryFee > 0 && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                Add ${(30 - subtotal).toFixed(2)} more for free delivery!
              </p>
            </div>
          )}

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium mt-6 transition-colors disabled:bg-gray-400"
            disabled={!user}
          >
            {user ? 'Proceed to Checkout' : 'Sign in to Order'}
          </button>

          {!user && (
            <p className="text-sm text-gray-600 text-center mt-2">
              Please sign in to place your order
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;