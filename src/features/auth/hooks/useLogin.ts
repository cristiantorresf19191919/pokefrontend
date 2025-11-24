'use client';

import { useMutation } from '@apollo/client/react';
import { graphql } from '@/gql';
import Cookies from 'js-cookie'; // Better for SEO/Next.js than localStorage
import { useEffect } from 'react';
import { useLoadingStore } from '@/lib/loading/useLoadingStore';

const LOGIN_MUTATION = graphql(`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      token
      message
    }
  }
`);

export const useLogin = () => {
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);
  const setLoading = useLoadingStore((state) => state.setLoading);

  // Track loading state globally
  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const login = async (username: string, password: string) => {
    const response = await loginMutation({ variables: { username, password } });
    
    if (response.data?.login.success && response.data.login.token) {
      // Store token in Cookie for Middleware access (SEO friendly protection)
      Cookies.set('auth_token', response.data.login.token); 
      return true;
    }
    return false;
  };

  return { login, isLoading: loading, error };
};


