import { ApolloClient, InMemoryCache, HttpLink, from, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8082/graphql',
});

// Global loading state reference for Apollo link
let globalSetLoading: ((loading: boolean) => void) | null = null;
let activeRequests = 0;

export const setGlobalLoading = (setLoading: (loading: boolean) => void) => {
  globalSetLoading = setLoading;
};

// Loading tracking link for client-side
const loadingLink = new ApolloLink((operation, forward) => {
  if (typeof window !== 'undefined' && globalSetLoading) {
    activeRequests++;
    globalSetLoading(true);
  }
  
  return forward(operation).map((response) => {
    if (typeof window !== 'undefined' && globalSetLoading) {
      activeRequests--;
      // Only hide loading when all requests are done
      if (activeRequests === 0) {
        // Small delay to prevent flickering on fast requests
        setTimeout(() => {
          if (activeRequests === 0) {
            globalSetLoading?.(false);
          }
        }, 100);
      }
    }
    return response;
  }).catch((error) => {
    // Handle errors - still decrement active requests
    if (typeof window !== 'undefined' && globalSetLoading) {
      activeRequests--;
      if (activeRequests === 0) {
        setTimeout(() => {
          if (activeRequests === 0) {
            globalSetLoading?.(false);
          }
        }, 100);
      }
    }
    throw error;
  });
});

// Auth link to add token from cookies (client-side only)
const authLink = setContext((_, { headers }) => {
  let token: string | undefined;
  
  if (typeof window !== 'undefined') {
    // Client-side: get from js-cookie
    token = Cookies.get('auth_token');
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Client-side Apollo Client
export function createApolloClient() {
  return new ApolloClient({
    link: from([loadingLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
  });
}

// Server-side Apollo Client (for RSC)
export function getClient(token?: string) {
  // Create auth link for server-side with token
  const serverAuthLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  // Create a new client for each server-side request
  // This ensures we don't share state between requests
  const client = new ApolloClient({
    link: from([serverAuthLink, httpLink]),
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  return client;
}

