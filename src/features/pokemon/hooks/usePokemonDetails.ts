'use client';

import { useQuery, useApolloClient } from '@apollo/client/react';
import { graphql } from '@/gql';
import { GetPokemonDetailsQuery } from '@/gql/graphql';
import { useRef, useEffect } from 'react';
import { useLoadingStore } from '@/lib/loading/useLoadingStore';

const GET_POKEMON_DETAILS = graphql(`
  query GetPokemonDetails($id: Int!) {
    pokemon(id: $id) {
      id
      name
      number
      imageUrl
      types
      weight
      height
      description
    }
  }
`);

export const usePokemonDetails = (id: number, initialData?: GetPokemonDetailsQuery | null) => {
  const client = useApolloClient();
  const hasWrittenInitialData = useRef(false);
  
  // Write initial server data to cache synchronously for proper SSR hydration
  if (initialData && id && !hasWrittenInitialData.current) {
    client.writeQuery({
      query: GET_POKEMON_DETAILS,
      variables: { id },
      data: initialData,
    });
    hasWrittenInitialData.current = true;
  }

  const { data, loading, error } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id },
    skip: !id,
    fetchPolicy: initialData ? 'cache-first' : 'cache-and-network', // Use cache if we have initial data
  });

  // Track loading state globally
  const setLoading = useLoadingStore((state) => state.setLoading);
  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  return {
    pokemon: data?.pokemon,
    isLoading: loading,
    error,
  };
};


