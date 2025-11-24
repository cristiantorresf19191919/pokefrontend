import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8082/graphql';

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

