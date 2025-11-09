'use client';

import AddProductForm from '@/components/AddProductForm';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';

export default function CreatePage() {
  return (
    <AuthGuard>
      <main className='max-w-3xl mx-auto py-10'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-semibold'>Create Product</h1>
          <Link href='/'>
            <button className='bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300'>
              Back
            </button>
          </Link>
        </div>
        <AddProductForm />
      </main>
    </AuthGuard>
  );
}
