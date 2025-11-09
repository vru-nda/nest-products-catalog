'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authApi } from '@/lib/api';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuth = authApi.isAuthenticated();

  useEffect(() => {
    if (!isAuth) {
      router.replace('/login');
    }
  }, [isAuth, router]);

  if (!isAuth) return null;
  return <>{children}</>;
}
