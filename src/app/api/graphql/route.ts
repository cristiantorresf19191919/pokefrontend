import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(request: NextRequest) {
  try {
    // Read the HttpOnly cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    // Get the GraphQL request body from the client
    const body = await request.json();

    // Forward the request to Spring Boot with the token
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Return the response to the client
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('GraphQL proxy error:', error);
    return NextResponse.json(
      {
        errors: [
          {
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
          },
        ],
      },
      { status: 500 }
    );
  }
}

