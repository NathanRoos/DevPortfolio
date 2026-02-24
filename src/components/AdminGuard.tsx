'use client';

import { useUser } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ManageGuardProps {
  children: React.ReactNode;
}

export default function ManageGuard({ children }: ManageGuardProps) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (isLoading) return;
      
      if (!user) {
        router.push('/api/auth/login');
        return;
      }

      try {
        const response = await fetch('/api/user/role');
        const data = await response.json();
        
        if (data.role === 'ADMIN') {
          setIsAdmin(true);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        router.push('/');
      } finally {
        setChecking(false);
      }
    }

    checkAdminStatus();
  }, [user, isLoading, router]);

  if (isLoading || checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Redirecting...</div>
      </div>
    );
  }

  return <>{children}</>;
}