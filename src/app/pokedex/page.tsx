import type { Metadata } from 'next';
import { PokedexView } from '@/features/pokemon/components/PokedexView';
import { getClient } from '@/lib/apollo/client';
import { gql } from '@apollo/client';
import { cookies } from 'next/headers';

const GET_POKEMONS = gql`
  query GetPokemons($first: Int, $after: String, $sortBy: String) {
    pokemons(first: $first, after: $after, sortBy: $sortBy) {
      edges {
        node {
          id
          name
          number
          imageUrl
          types
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

export const metadata: Metadata = {
  title: 'Pokedex | Browse Pokemon',
  description: 'Browse and explore all Pokemon in the Pokedex',
};

export default async function PokedexPage() {
  // Fetch initial data server-side for SEO
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  let initialData = null;
  try {
    const { data } = await getClient(token).query({
      query: GET_POKEMONS,
      variables: { 
        first: 20, 
        sortBy: 'number' // Default sort
      },
      fetchPolicy: 'network-only', // Always fetch fresh data on server
    });
    initialData = data;
  } catch (error) {
    console.error('Error fetching initial Pokemon data:', error);
  }

  return <PokedexView initialData={initialData} />;
}


