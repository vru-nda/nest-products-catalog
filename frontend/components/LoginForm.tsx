'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {authApi} from '@/lib/api';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await authApi.login({email, password});
      if (res.success) {
        router.push('/');
      } else {
        setError(res.message ?? 'Login failed');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-96 p-6 border rounded shadow-sm'>
        <h1 className='text-2xl font-semibold mb-6 text-center'>Sign in</h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && (
            <div className='text-red-500 text-sm text-center'>{error}</div>
          )}

          <div>
            <label htmlFor='email' className='block mb-1 text-sm font-medium'>
              Email
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded text-sm focus:ring-2 focus:ring-green-200'
              required
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block mb-1 text-sm font-medium'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded text-sm focus:ring-2 focus:ring-green-200'
              required
            />
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-green-600 text-white p-2 rounded-md disabled:opacity-60 hover:bg-green-700'
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
