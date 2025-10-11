export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'customer' | 'restaurant_owner';
  created_at: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  description: string;
  address: string;
  owner_id: string;
  is_active: boolean;
  created_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  restaurant_id: string;
  is_available: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  restaurant_id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  delivery_address: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  menu_item_id: string;
  quantity: number;
  price: number;
  name: string;
}