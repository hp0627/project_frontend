const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

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
  // define other properties as needed
}

export const api = {
  // Auth endpoints
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Login failed');
    }

    return response.json();
  },

  register: async (
    full_name: string,
    email: string,
    password: string,
    role: string
  ): Promise<RegisterResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name,
        email,
        password,
        role: role.toLowerCase(),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Registration failed');
    }

    return response.json();
  },

  // Restaurant endpoints
  getRestaurants: async (): Promise<Restaurant[]> => {
    const response = await fetch(`${API_BASE_URL}/restaurants`);
    if (!response.ok) throw new Error('Failed to fetch restaurants');
    return response.json();
  },

  getRestaurant: async (id: string): Promise<Restaurant> => {
    const response = await fetch(`${API_BASE_URL}/restaurants/${id}`);
    if (!response.ok) throw new Error('Failed to fetch restaurant');
    return response.json();
  },

  searchRestaurants: async (searchTerm: string): Promise<Restaurant[]> => {
    const response = await fetch(`${API_BASE_URL}/restaurants/search?q=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) throw new Error('Failed to search restaurants');
    return response.json();
  },

  getRestaurantsByCuisine: async (cuisine: string): Promise<Restaurant[]> => {
    const response = await fetch(`${API_BASE_URL}/restaurants/cuisine/${encodeURIComponent(cuisine)}`);
    if (!response.ok) throw new Error('Failed to fetch restaurants by cuisine');
    return response.json();
  },

  // Menu endpoints
  getMenuItems: async (restaurantId: string): Promise<MenuItem[]> => {
    const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/menu`);
    if (!response.ok) throw new Error('Failed to fetch menu items');
    return response.json();
  },

  // Order endpoints
  createOrder: async (orderData: Order, token: string) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Order creation failed');
    }

    return response.json();
  },

  getUserOrders: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  // Restaurant owner endpoints
  getRestaurantOrders: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/restaurant`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch restaurant orders');
    return response.json();
  },

  updateOrderStatus: async (orderId: string, status: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  },

  // Menu management
  createMenuItem: async (menuItem: MenuItem, token: string) => {
    const response = await fetch(`${API_BASE_URL}/menu-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuItem),
    });

    if (!response.ok) throw new Error('Failed to create menu item');
    return response.json();
  },

  updateMenuItem: async (itemId: string, menuItem: MenuItem, token: string) => {
    const response = await fetch(`${API_BASE_URL}/menu-items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuItem),
    });

    if (!response.ok) throw new Error('Failed to update menu item');
    return response.json();
  },

  deleteMenuItem: async (itemId: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/menu-items/${itemId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to delete menu item');
    if (response.status === 204) return null;
    return response.json();
  },
};
