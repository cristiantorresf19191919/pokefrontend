'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from './useAuthStore';
import { LoginModal } from '@/features/auth/components/LoginModal';
import Cookies from 'js-cookie';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isChecking, setIsChecking] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const { checkAuth, isAuthenticated, setAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check authentication status on mount and pathname change
    const authenticated = checkAuth();
    setIsChecking(false);

    // Public routes that don't require authentication
    const publicRoutes = ['/login'];
    const isPublicRoute = publicRoutes.includes(pathname);

    // Also check cookie directly
    const token = Cookies.get('auth_token');
    if (token && !authenticated) {
      setAuth(token);
    }

    if (!authenticated && !token && !isPublicRoute) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [pathname, checkAuth, setAuth]);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    const redirect = searchParams.get('redirect');
    if (redirect) {
      router.push(redirect);
    } else if (pathname === '/login') {
      router.push('/pokedex');
    }
    router.refresh();
  };

  // Don't render children until auth check is complete
  if (isChecking) {
    return null;
  }

  // Show login modal if not authenticated and not on login page
  const shouldShowModal = showLogin && !isAuthenticated && pathname !== '/login';
  
  return (
    <>
      {children}
      {shouldShowModal && (
        <LoginModal open={shouldShowModal} onSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

