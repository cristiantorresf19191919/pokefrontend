import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to access the complete Pokédex and explore all Pokemon with detailed information about abilities, moves, and forms.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Login | Pokédex',
    description: 'Login to access the complete Pokédex',
    type: 'website',
    url: '/login',
  },
  alternates: {
    canonical: '/login',
  },
};

export default function LoginPage() {
  return <LoginForm />;
}


