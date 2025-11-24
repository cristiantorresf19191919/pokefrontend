import { MetadataRoute } from 'next';
import { getClient } from '@/lib/apollo/client';
import { gql } from '@apollo/client';
import { cookies } from 'next/headers';

const GET_POKEMONS = gql`
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
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const { data } = await getClient(token).query({
      query: GET_POKEMONS,
      variables: { first: 1000 }, // Adjust based on your needs
      fetchPolicy: 'network-only',
    });

    if (data?.pokemons?.edges) {
      const pokemonRoutes = data.pokemons.edges.map((edge: { node: { id: number } }) => ({
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

