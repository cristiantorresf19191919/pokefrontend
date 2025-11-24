'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  setAuth: (token: string | null) => void;
  checkAuth: () => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,

      setAuth: (token: string | null) => {
        if (token) {
          // Store in cookie for server-side access
          Cookies.set('auth_token', token, {
            expires: 7, // 7 days
            path: '/',
            sameSite: 'lax',
          });
          set({ isAuthenticated: true, token });
        } else {
          Cookies.remove('auth_token', { path: '/' });
          set({ isAuthenticated: false, token: null });
        }
      },

      checkAuth: () => {
        const token = Cookies.get('auth_token');
        if (token) {
          set({ isAuthenticated: true, token });
          return true;
        } else {
          set({ isAuthenticated: false, token: null });
          return false;
        }
      },

      logout: () => {
        Cookies.remove('auth_token', { path: '/' });
        set({ isAuthenticated: false, token: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
);

