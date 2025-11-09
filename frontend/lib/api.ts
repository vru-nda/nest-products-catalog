import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  description?: string;
}

export interface AuthResponse {
  access_token: string;
  user: {id: string; email: string; name: string};
}

export const authApi = {
  async login(credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> {
    const {data} = await api.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials,
    );
    if (
      typeof window !== 'undefined' &&
      data.success &&
      data.data?.access_token
    ) {
      localStorage.setItem('token', data.data.access_token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    return data;
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  },

  isAuthenticated() {
    if (typeof window === 'undefined') return false; // prevent server crash
    return !!localStorage.getItem('token');
  },
};

export const productApi = {
  async getAll(): Promise<ApiResponse<Product[]>> {
    const {data} = await api.get<ApiResponse<Product[]>>('/products');
    return data;
  },
  async create(product: CreateProductDto): Promise<ApiResponse<Product>> {
    const {data} = await api.post<ApiResponse<Product>>('/products', product);
    return data;
  },
  async delete(id: string): Promise<ApiResponse<{id: string}>> {
    const {data} = await api.delete<ApiResponse<{id: string}>>(
      `/products/${id}`,
    );
    return data;
  },
};
