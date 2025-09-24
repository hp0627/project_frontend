const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

export interface LoginResponse {
  token: string;
  id: number;
  email: string;
  full_name: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
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
}

interface MenuItem {
  id?: string;
  name: string;
  price: number;
  description?: string;
}

interface Order {
  id?: string;
  // other properties as needed
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    } catch {
      const errorText = await response.text();
      throw new Error(errorText || 'Request failed');
    }
  }
  return response.status === 204 ? null : response.json();
};

export const api = {
  // Auth
  login: (email: string, password: string): Promise<LoginResponse> =>
    fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(handleResponse),

  register: (full_name: string, email: string, password: string, role: string): Promise<RegisterResponse> =>
    fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, password, role: role.toLowerCase() }),
    }).then(handleResponse),

  // Restaurants
  getRestaurants: (): Promise<Restaurant[]> =>
    fetch(`${API_BASE_URL}/restaurants`).then(handleResponse),

  getRestaurant: (id: string): Promise<Restaurant> =>
    fetch(`${API_BASE_URL}/restaurants/${id}`).then(handleResponse),

  searchRestaurants: (searchTerm: string): Promise<Restaurant[]> =>
    fetch(`${API_BASE_URL}/restaurants/search?q=${encodeURIComponent(searchTerm)}`).then(handleResponse),

  getRestaurantsByCuisine: (cuisine: string): Promise<Restaurant[]> =>
    fetch(`${API_BASE_URL}/restaurants/cuisine/${encodeURIComponent(cuisine)}`).then(handleResponse),

  // Menu
  getMenuItems: (restaurantId: string): Promise<MenuItem[]> =>
    fetch(`${API_BASE_URL}/restaurants/${restaurantId}/menu`).then(handleResponse),

  createMenuItem: (menuItem: MenuItem, token: string) =>
    fetch(`${API_BASE_URL}/menu-items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(menuItem),
    }).then(handleResponse),

  updateMenuItem: (itemId: string, menuItem: MenuItem, token: string) =>
    fetch(`${API_BASE_URL}/menu-items/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(menuItem),
    }).then(handleResponse),

  deleteMenuItem: (itemId: string, token: string) =>
    fetch(`${API_BASE_URL}/menu-items/${itemId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }).then(handleResponse),

  // Orders
  createOrder: (orderData: Order, token: string) =>
    fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(orderData),
    }).then(handleResponse),

  getUserOrders: (token: string) =>
    fetch(`${API_BASE_URL}/orders/user`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(handleResponse),

  getRestaurantOrders: (token: string) =>
    fetch(`${API_BASE_URL}/orders/restaurant`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(handleResponse),

  updateOrderStatus: (orderId: string, status: string, token: string) =>
    fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    }).then(handleResponse),
};
