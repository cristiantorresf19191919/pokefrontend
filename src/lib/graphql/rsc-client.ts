import { cookies } from 'next/headers';

// Determine GraphQL URL based on environment
const getGraphQLUrl = () => {
  // If explicitly set via environment variable, use it
  if (process.env.NEXT_PUBLIC_GRAPHQL_URL) {
    return process.env.NEXT_PUBLIC_GRAPHQL_URL;
  }
  
  // Use localhost for development, production URL for production
  if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === undefined) {
    return 'http://localhost:8082/graphql';
  }
  
  return 'https://pokebackend-e8epanf7cpaje5dy.centralus-01.azurewebsites.net/graphql';
};

const GRAPHQL_URL = getGraphQLUrl();

/**
 * Server-side GraphQL client for React Server Components
 * Reads the auth token from HttpOnly cookies and makes authenticated requests
 */
export async function executeGraphQL<T = unknown>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<{ data?: T; errors?: Array<{ message: string }> }> {
  try {
    // Read the HttpOnly cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    // Filter out null/undefined values from variables to prevent GraphQL validation errors
    const cleanedVariables = variables
      ? Object.fromEntries(
          Object.entries(variables).filter(([, value]) => value != null)
        )
      : {};

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        query,
        variables: cleanedVariables,
      }),
      // Important: disable caching for authenticated requests
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors && result.errors.length > 0) {
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

