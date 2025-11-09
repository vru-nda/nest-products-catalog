'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {CreateProductDto, productApi} from '@/lib/api';

interface FieldErrors {
  name?: string;
  price?: string;
  general?: string;
}

export default function AddProductForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const e: FieldErrors = {};
    if (!name.trim()) e.name = 'Name is required';
    if (name.trim().length > 200)
      e.name = 'Name must be 200 characters or less';

    const n = Number(price);
    if (price.trim() === '') e.price = 'Price is required';
    else if (Number.isNaN(n)) e.price = 'Price must be a number';
    else if (n <= 0) e.price = 'Price must be a positive number';
    else if (!Number.isFinite(n)) e.price = 'Price must be finite';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    const payload: CreateProductDto = {
      name: name.trim(),
      price: Number(price),
      description: description.trim() || undefined,
    };

    setIsSubmitting(true);

    try {
      const response = await productApi.create(payload);

      if (!response.success) {
        setErrors({general: response.message || 'Failed to create product'});
        setIsSubmitting(false);
        return;
      }

      router.push('/?created=1');
    } catch (err) {
      setErrors({general: (err as Error).message || 'Network error'});
      setIsSubmitting(false);
    }
  };

  return (
    <main className='max-w-3xl mx-auto py-10'>
      <form
        onSubmit={handleSubmit}
        className='space-y-6 border border-gray-200 p-6 rounded-md shadow-sm'
        noValidate
        aria-describedby={errors.general ? 'form-error' : undefined}
      >
        <div>
          <label htmlFor='name' className='block text-sm font-medium'>
            Name <span className='text-red-500'>*</span>
          </label>
          <input
            id='name'
            name='name'
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder='e.g. Coffee mug'
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-green-200`}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            maxLength={200}
            required
          />
          {errors.name && (
            <p id='name-error' className='mt-1 text-sm text-red-600'>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='price' className='block text-sm font-medium'>
            Price <span className='text-red-500'>*</span>
          </label>
          <input
            id='price'
            name='price'
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            placeholder='e.g. 12.99'
            inputMode='decimal'
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-green-200`}
            aria-invalid={Boolean(errors.price)}
            aria-describedby={errors.price ? 'price-error' : undefined}
            required
          />
          {errors.price && (
            <p id='price-error' className='mt-1 text-sm text-red-600'>
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='description' className='block text-sm font-medium'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder='Optional description (max 1000 characters)'
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200'
            rows={4}
            maxLength={1000}
          />
        </div>

        {errors.general && (
          <div id='form-error' className='text-sm text-red-600'>
            {errors.general}
          </div>
        )}

        <div className='flex items-center gap-3'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-green-300'
          >
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>

          <button
            type='button'
            onClick={() => router.back()}
            className='border border-gray-300 bg-white px-3 py-2 rounded-md hover:bg-gray-50 text-gray-900'
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
