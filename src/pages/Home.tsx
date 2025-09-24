import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import { Search, Filter } from 'lucide-react';

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

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Bella Italia',
    cuisine: 'Italian',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Authentic Italian cuisine with fresh pasta and wood-fired pizzas'
  },
  {
    id: '2',
    name: 'Sushi Master',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '20-30 min',
    deliveryFee: 0,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh sushi and sashimi made by master chefs'
  },
  {
    id: '3',
    name: 'Burger House',
    cuisine: 'American',
    rating: 4.6,
    deliveryTime: '15-25 min',
    deliveryFee: 1.99,
    image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Gourmet burgers with premium ingredients and crispy fries'
  },
  {
    id: '4',
    name: 'Spice Garden',
    cuisine: 'Indian',
    rating: 4.7,
    deliveryTime: '30-40 min',
    deliveryFee: 2.49,
    image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Authentic Indian curries and tandoor specialties'
  },
  {
    id: '5',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: 1.49,
    image: 'https://images.pexels.com/photos/2087090/pexels-photo-2087090.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh tacos, burritos, and Mexican street food favorites'
  },
  {
    id: '6',
    name: 'Dragon Kitchen',
    cuisine: 'Chinese',
    rating: 4.4,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    image: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Traditional Chinese dishes with modern presentation'
  }
];

const cuisines = ['All', 'Italian', 'Japanese', 'American', 'Indian', 'Mexican', 'Chinese'];

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  useEffect(() => {
    let filtered = mockRestaurants;

    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCuisine !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.cuisine === selectedCuisine);
    }

    setRestaurants(filtered);
  }, [searchTerm, selectedCuisine]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Delicious food, delivered fast
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Order from your favorite local restaurants
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-lg"
            placeholder="Search restaurants, cuisines..."
          />
        </div>
      </div>

      {/* Cuisine Filter */}
      <div className="flex items-center space-x-4 mb-8 overflow-x-auto pb-2">
        <div className="flex items-center space-x-1 text-gray-700 font-medium whitespace-nowrap">
          <Filter className="h-5 w-5" />
          <span>Filter:</span>
        </div>
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => setSelectedCuisine(cuisine)}
            className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
              selectedCuisine === cuisine
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {cuisine}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {searchTerm || selectedCuisine !== 'All' 
            ? `Found ${restaurants.length} restaurants` 
            : 'Popular restaurants'
          }
        </h2>
      </div>

      {/* Restaurant Grid */}
      {restaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;