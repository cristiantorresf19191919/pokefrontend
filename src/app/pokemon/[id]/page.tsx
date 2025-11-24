import type { Metadata } from 'next';
import { executeGraphQL } from '@/lib/graphql/rsc-client';
import { PokemonDetailView } from '@/features/pokemon/components/PokemonDetailView';
import { StructuredData } from '@/lib/seo/StructuredData';
import { GetPokemonDetailsQuery } from '@/gql/graphql';

const GET_POKEMON_DETAILS_QUERY = `
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
`;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const pokemonId = parseInt(params.id);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  try {
    const result = await executeGraphQL<GetPokemonDetailsQuery>({
      query: GET_POKEMON_DETAILS_QUERY,
      variables: { id: pokemonId },
    });
    
    const data = result.data;

    if (data?.pokemon) {
      const pokemon = data.pokemon;
      const abilitiesList = pokemon.abilities?.map(a => a.name).join(', ') || '';
      const movesCount = pokemon.moves?.length || 0;
      const formsCount = pokemon.forms?.length || 0;
      
      const description = `Discover ${pokemon.name} (#${String(pokemon.number).padStart(3, '0')}) - ${abilitiesList ? `Abilities: ${abilitiesList}. ` : ''}${movesCount} moves, ${formsCount} forms. Complete Pokemon details in the Pokédex.`;

      return {
        title: `${pokemon.name} | #${String(pokemon.number).padStart(3, '0')} | Pokédex`,
        description,
        keywords: [
          pokemon.name,
          `Pokemon ${pokemon.number}`,
          'Pokédex',
          ...(pokemon.abilities?.map(a => a.name) || []),
        ],
        openGraph: {
          title: `${pokemon.name} | #${String(pokemon.number).padStart(3, '0')} | Pokédex`,
          description,
          type: 'website',
          url: `${baseUrl}/pokemon/${pokemonId}`,
          images: [
            {
              url: pokemon.imageUrl,
              width: 1200,
              height: 1200,
              alt: `${pokemon.name} - Pokemon #${pokemon.number}`,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${pokemon.name} | #${String(pokemon.number).padStart(3, '0')} | Pokédex`,
          description,
          images: [pokemon.imageUrl],
        },
        alternates: {
          canonical: `/pokemon/${pokemonId}`,
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'Pokemon | Pokédex',
    description: 'Pokemon details and information in the Pokédex',
    alternates: {
      canonical: `/pokemon/${pokemonId}`,
    },
  };
}

export default async function PokemonPage({
  params,
}: {
  params: { id: string };
}) {
  const pokemonId = parseInt(params.id);
  
  // Fetch initial data server-side for SEO using RSC client
  let initialData: GetPokemonDetailsQuery | null = null;
  try {
    const result = await executeGraphQL<GetPokemonDetailsQuery>({
      query: GET_POKEMON_DETAILS_QUERY,
      variables: { id: pokemonId },
    });
    
    if (result.data) {
      initialData = result.data;
    } else if (result.errors) {
      console.error('GraphQL errors fetching Pokemon details:', result.errors);
    }
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
  }

  // Generate structured data for SEO
  const structuredData = initialData?.pokemon
    ? {
        '@context': 'https://schema.org',
        '@type': 'Thing',
        name: initialData.pokemon.name,
        description: `Pokemon #${String(initialData.pokemon.number).padStart(3, '0')} - ${initialData.pokemon.name}`,
        image: initialData.pokemon.imageUrl,
        identifier: initialData.pokemon.id,
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Pokemon Number',
            value: initialData.pokemon.number,
          },
          ...(initialData.pokemon.abilities?.map((ability: { name: string; isHidden: boolean }) => ({
            '@type': 'PropertyValue',
            name: ability.isHidden ? 'Hidden Ability' : 'Ability',
            value: ability.name,
          })) || []),
        ],
      }
    : null;

  return (
    <>
      {structuredData && <StructuredData data={structuredData} />}
      <PokemonDetailView id={pokemonId} initialData={initialData} />
    </>
  );
}


