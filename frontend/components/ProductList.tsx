'use client';

import {useEffect, useState, useCallback} from 'react';
import {Product, productApi} from '@/lib/api';

interface ProductListProps {
  products?: Product[];
  isAuthenticated: boolean;
}

export default function ProductList({
  products = [],
  isAuthenticated,
}: ProductListProps) {
  const [items, setItems] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<Product[]>(products);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Sync items when products prop changes
  useEffect(() => {
    setItems(products);
    setFilteredItems(products);
  }, [products]);

  // Filter products when search term changes
  useEffect(() => {
    const filtered = items.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?'))
      return;

    try {
      setLoadingId(id);
      const res = await productApi.delete(id);

      if (res.success) {
        setItems((prev) => prev.filter((p) => p.id !== id));
        alert('Product deleted successfully!');
      } else {
        alert(res.message || 'Failed to delete product.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while deleting the product.');
    } finally {
      setLoadingId(null);
    }
  }, []);

  return (
    <div className='space-y-4'>
      {/* 🔍 Search / Filter Input */}
      <input
        type='text'
        placeholder='Search products...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full px-4 py-2 rounded-md bg-[#1a1a1a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500'
      />

      {/* Product List */}
      {filteredItems.length === 0 ? (
        <p className='text-gray-400 text-center'>No products found.</p>
      ) : (
        filteredItems.map((p) => (
          <div
            key={p.id}
            className='border border-gray-700 p-4 rounded-lg bg-[#0d0d0d] flex justify-between items-start hover:bg-[#222] transition'
          >
            <div>
              <h3 className='font-semibold text-lg text-white'>{p.name}</h3>
              <p className='text-gray-300'>${p.price}</p>
              {p.description && (
                <p className='text-gray-400 text-sm mt-1'>{p.description}</p>
              )}
            </div>

            {isAuthenticated && (
              <button
                onClick={() => handleDelete(p.id)}
                disabled={loadingId === p.id}
                className='text-red-400 hover:text-red-300 font-medium text-sm border border-red-500 px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loadingId === p.id ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
