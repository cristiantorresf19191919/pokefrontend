import { ApolloClient, InMemoryCache, HttpLink, from, ApolloLink } from '@apollo/client';

// Point to the Next.js proxy route handler instead of Spring Boot directly
// The proxy will handle authentication via HttpOnly cookies
const httpLink = new HttpLink({
  uri: '/api/graphql',
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

// Client-side Apollo Client
// Note: No auth link needed - the /api/graphql proxy handles authentication
// via HttpOnly cookies automatically
export function createApolloClient() {
  return new ApolloClient({
    link: from([loadingLink, httpLink]),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
  });
}

// Note: Server-side GraphQL requests should use the RSC client (lib/graphql/rsc-client.ts)
// instead of Apollo Client for better Next.js App Router compatibility
// This function is kept for backward compatibility but is deprecated
export function getClient(token?: string) {
  console.warn(
    'getClient() is deprecated. Use executeGraphQL from lib/graphql/rsc-client.ts for server-side requests.'
  );
  
  // For backward compatibility, create a client that points to the proxy
  // but this should not be used in new code
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  return client;
}

