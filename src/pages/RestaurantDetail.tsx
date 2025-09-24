import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Truck, MapPin } from 'lucide-react';
import MenuItemCard from '../components/MenuItemCard';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  restaurantId: string;
  restaurantName: string;
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  description: string;
  address: string;
}

const mockRestaurant: Restaurant = {
  id: '1',
  name: 'Bella Italia',
  cuisine: 'Italian',
  rating: 4.8,
  deliveryTime: '25-35 min',
  deliveryFee: 2.99,
  image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1200',
  description: 'Authentic Italian cuisine with fresh pasta and wood-fired pizzas',
  address: '123 Little Italy, New York, NY'
};

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, basil, extra virgin olive oil',
    price: 18.99,
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Pizza',
    restaurantId: '1',
    restaurantName: 'Bella Italia'
  },
  {
    id: '2',
    name: 'Spaghetti Carbonara',
    description: 'Creamy pasta with pancetta, eggs, and parmesan cheese',
    price: 16.99,
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Pasta',
    restaurantId: '1',
    restaurantName: 'Bella Italia'
  },
  {
    id: '3',
    name: 'Chicken Parmigiana',
    description: 'Breaded chicken breast with marinara sauce and melted mozzarella',
    price: 22.99,
    image: 'https://images.pexels.com/photos/6107787/pexels-photo-6107787.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Main Course',
    restaurantId: '1',
    restaurantName: 'Bella Italia'
  },
  {
    id: '4',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, parmesan, croutons, caesar dressing',
    price: 12.99,
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Salad',
    restaurantId: '1',
    restaurantName: 'Bella Italia'
  },
  {
    id: '5',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with ladyfingers, espresso, and mascarpone',
    price: 8.99,
    image: 'https://images.pexels.com/photos/6133298/pexels-photo-6133298.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dessert',
    restaurantId: '1',
    restaurantName: 'Bella Italia'
  }
];

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(mockMenuItems.map(item => item.category))];

  useEffect(() => {
    // In a real app, fetch restaurant and menu data based on ID
    setRestaurant(mockRestaurant);
    setMenuItems(mockMenuItems);
  }, [id]);

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-gray-600">Loading restaurant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to restaurants</span>
      </Link>

      {/* Restaurant Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="h-64 relative">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg opacity-90">{restaurant.cuisine}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-6 mb-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="font-semibold">{restaurant.rating}</span>
              <span className="text-gray-600">(500+ reviews)</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Truck className="h-5 w-5" />
              <span>${restaurant.deliveryFee === 0 ? 'Free delivery' : `$${restaurant.deliveryFee.toFixed(2)} delivery`}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{restaurant.description}</p>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{restaurant.address}</span>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="flex items-center space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No items in this category
          </h3>
          <p className="text-gray-600">
            Try selecting a different category
          </p>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;