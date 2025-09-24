import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

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

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        restaurantId: item.restaurantId,
        restaurantName: item.restaurantName,
        image: item.image,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex">
        <div className="flex-1 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-orange-600">${item.price.toFixed(2)}</span>
            <button
              onClick={handleAddToCart}
              className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="w-24 h-24 m-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;