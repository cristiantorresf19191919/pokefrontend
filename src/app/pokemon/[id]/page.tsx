import type { Metadata } from 'next';
import { getClient } from '@/lib/apollo/client';
import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
import { PokemonDetailView } from '@/features/pokemon/components/PokemonDetailView';

const GET_POKEMON_DETAILS = gql`
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
`;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  try {
    const { data } = await getClient(token).query({
      query: GET_POKEMON_DETAILS,
      variables: { id: parseInt(params.id) },
    });

    if (data?.pokemon) {
      return {
        title: `${data.pokemon.name} | Pokedex`,
        description: data.pokemon.description || `Details for Pokemon #${data.pokemon.number}`,
        openGraph: {
          images: [data.pokemon.imageUrl],
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'Pokemon | Pokedex',
    description: 'Pokemon details',
  };
}

export default async function PokemonPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const pokemonId = parseInt(params.id);
  
  // Fetch initial data server-side for SEO
  let initialData = null;
  try {
    const { data } = await getClient(token).query({
      query: GET_POKEMON_DETAILS,
      variables: { id: pokemonId },
      fetchPolicy: 'network-only', // Always fetch fresh data on server
    });
    initialData = data;
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
  }

  return <PokemonDetailView id={pokemonId} initialData={initialData} />;
}


