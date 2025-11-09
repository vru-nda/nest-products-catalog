'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import ProductList from '@/components/ProductList';
import {productApi, authApi, Product} from '@/lib/api';

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check auth status safely after mount
    queueMicrotask(() => {
      setIsAuthenticated(authApi.isAuthenticated());
    });

    // Fetch products asynchronously
    const fetchProducts = async () => {
      const response = await productApi.getAll();
      if (response.success && response.data) setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    authApi.logout();
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <main className='flex items-center justify-center min-h-screen text-gray-300'>
        Loading...
      </main>
    );
  }

  return (
    <main className='max-w-3xl mx-auto py-10 text-gray-100 min-h-screen'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-semibold'>Product Catalog</h1>
        <div className='flex gap-4'>
          {isAuthenticated && (
            <Link href='/create'>
              <button className='bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700'>
                Create product
              </button>
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className='bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700'
            >
              Logout
            </button>
          ) : (
            <Link href='/login'>
              <button className='bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700'>
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      <ProductList products={products} isAuthenticated={!!isAuthenticated} />
    </main>
  );
}
