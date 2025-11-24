import { cookies } from 'next/headers';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8082/graphql';

/**
 * Server-side GraphQL client for React Server Components
 * Reads the auth token from HttpOnly cookies and makes authenticated requests
 */
export async function executeGraphQL<T = any>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<{ data?: T; errors?: Array<{ message: string }> }> {
  try {
    // Read the HttpOnly cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        query,
        variables: variables || {},
      }),
      // Important: disable caching for authenticated requests
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
    }

    return result;
  } catch (error) {
    console.error('RSC GraphQL client error:', error);
    return {
      errors: [
        {
          message: error instanceof Error ? error.message : 'An unexpected error occurred',
        },
      ],
    };
  }
}

