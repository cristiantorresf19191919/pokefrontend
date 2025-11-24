'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginModal } from '@/features/auth/components/LoginModal';
import { useAuthStore } from '@/lib/auth/useAuthStore';
import { Box } from '@mui/material';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // If already authenticated, redirect
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect') || '/pokedex';
      router.push(redirect);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleLoginSuccess = () => {
    const redirect = searchParams.get('redirect') || '/pokedex';
    router.push(redirect);
    router.refresh();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
      }}
    >
      <LoginModal open={true} onSuccess={handleLoginSuccess} />
    </Box>
  );
}
