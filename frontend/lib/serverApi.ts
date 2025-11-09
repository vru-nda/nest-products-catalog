import {ApiResponse, Product} from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const serverApi = {
  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    try {
      const res = await fetch(`${API_URL}/products`, {
        cache: 'no-store',
      });
      return await res.json();
    } catch (err) {
      return {success: false, message: 'Failed to fetch products'};
    }
  },
};
