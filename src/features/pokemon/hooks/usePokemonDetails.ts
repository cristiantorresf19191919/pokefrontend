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
      abilities {
        name
        isHidden
      }
      moves {
        name
        levelLearnedAt
      }
      forms {
        name
        url
      }
    }
  }
`);

export const usePokemonDetails = (id: number, initialData?: GetPokemonDetailsQuery | null) => {
  const client = useApolloClient();
  const hasWrittenInitialData = useRef(false);
  
  // Write initial server data to cache for proper SSR hydration
  useEffect(() => {
    if (initialData && id && !hasWrittenInitialData.current) {
      client.writeQuery({
        query: GET_POKEMON_DETAILS,
        variables: { id },
        data: initialData,
      });
      hasWrittenInitialData.current = true;
    }
  }, [initialData, id, client]);

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


