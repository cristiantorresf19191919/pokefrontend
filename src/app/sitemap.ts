import { MetadataRoute } from 'next';
import { executeGraphQL } from '@/lib/graphql/rsc-client';
import { GetPokemonsQuery } from '@/gql/graphql';

const GET_POKEMONS_QUERY = `
  query GetPokemons($first: Int) {
    pokemons(first: $first) {
      edges {
        node {
          id
        }
      }
      totalCount
    }
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/pokedex`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dynamic Pokemon routes
  try {
    const result = await executeGraphQL<GetPokemonsQuery>({
      query: GET_POKEMONS_QUERY,
      variables: { first: 1000 }, // Adjust based on your needs
    });

    if (result.data?.pokemons?.edges) {
      const pokemonRoutes = result.data.pokemons.edges.map((edge) => ({
        url: `${baseUrl}/pokemon/${edge.node.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

      routes.push(...pokemonRoutes);
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return routes;
}

