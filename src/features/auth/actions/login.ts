'use server';

import { cookies } from 'next/headers';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8082/graphql';

interface LoginResponse {
  data?: {
    login: {
      success: boolean;
      token: string;
      message?: string;
    };
  };
  errors?: Array<{
    message: string;
    extensions?: {
      code?: string;
    };
  }>;
}

export async function loginAction(username: string, password: string) {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              success
              token
              message
            }
          }
        `,
        variables: {
          username,
          password,
        },
      }),
    });

    const result: LoginResponse = await response.json();

    if (result.errors) {
      return {
        success: false,
        error: result.errors[0]?.message || 'Login failed',
      };
    }

    if (result.data?.login.success && result.data.login.token) {
      const cookieStore = await cookies();
      
      // Set HttpOnly, Secure cookie
      cookieStore.set('auth_token', result.data.login.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        // Optional: set maxAge (e.g., 7 days)
        maxAge: 60 * 60 * 24 * 7,
      });

      return {
        success: true,
        message: result.data.login.message || 'Login successful',
      };
    }

    return {
      success: false,
      error: result.data?.login.message || 'Login failed',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

