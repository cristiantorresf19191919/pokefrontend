import type { Metadata } from 'next';
import { PokedexView } from '@/features/pokemon/components/PokedexView';
import { executeGraphQL } from '@/lib/graphql/rsc-client';
import { GetPokemonsQuery } from '@/gql/graphql';

const GET_POKEMONS_QUERY = `
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
  let totalCount = null;
  try {
    const result = await executeGraphQL<GetPokemonsQuery>({
      query: GET_POKEMONS_QUERY,
      variables: { first: 1 },
    });
    totalCount = result.data?.pokemons?.totalCount ?? null;
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
  // Fetch initial data server-side for SEO using RSC client
  let initialData: GetPokemonsQuery | null = null;
  try {
    const result = await executeGraphQL<GetPokemonsQuery>({
      query: GET_POKEMONS_QUERY,
      variables: { 
        first: 20, 
        sortBy: 'number' // Default sort
      },
    });
    
    if (result.data) {
      initialData = result.data;
    } else if (result.errors) {
      console.error('GraphQL errors fetching initial Pokemon data:', result.errors);
    }
  } catch (error) {
    console.error('Error fetching initial Pokemon data:', error);
  }

  return <PokedexView initialData={initialData} />;
}


