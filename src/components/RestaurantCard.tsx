import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Truck } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  description: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative h-48">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{restaurant.rating}</span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                {restaurant.name}
              </h3>
              <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {restaurant.description}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <Truck className="h-4 w-4" />
                <span>${restaurant.deliveryFee === 0 ? 'Free' : restaurant.deliveryFee.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;