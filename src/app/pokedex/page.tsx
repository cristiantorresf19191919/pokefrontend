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
          abilities {
            name
            isHidden
          }
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

export async function generateMetadata(): Promise<Metadata> {
  // Fetch total count for metadata
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  let totalCount = null;
  try {
    const { data } = await getClient(token).query({
      query: GET_POKEMONS,
      variables: { first: 1 },
      fetchPolicy: 'network-only',
    });
    totalCount = data?.pokemons?.totalCount;
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }

  const description = totalCount
    ? `Browse and explore all ${totalCount} Pokemon in the complete Pokédex. Discover abilities, moves, and forms for every Pokemon.`
    : 'Browse and explore the complete collection of Pokemon in the Pokédex. Discover abilities, moves, and forms for every Pokemon.';

  return {
    title: 'Browse All Pokemon',
    description,
    openGraph: {
      title: 'Browse All Pokemon | Pokédex',
      description,
      type: 'website',
      url: '/pokedex',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Browse All Pokemon | Pokédex',
      description,
    },
    alternates: {
      canonical: '/pokedex',
    },
  };
}

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


