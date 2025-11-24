'use client';

import { ApolloProvider } from '@apollo/client/react';
import { createApolloClient, setGlobalLoading } from './client';
import { useMemo, useEffect } from 'react';
import { useLoadingStore } from '@/lib/loading/useLoadingStore';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const client = useMemo(() => createApolloClient(), []);
  
  // Set global loading function for Apollo link
  useEffect(() => {
    setGlobalLoading(setLoading);
  }, [setLoading]);
  
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

