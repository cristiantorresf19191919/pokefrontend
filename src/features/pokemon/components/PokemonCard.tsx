'use client';

import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  pokemon: {
    id: number;
    name: string;
    number: number;
    imageUrl: string;
    abilities: Array<{
      name: string;
      isHidden: boolean;
    }>;
  };
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Link href={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 4,
          },
        }}
      >
        <CardMedia
          sx={{
            position: 'relative',
            width: '100%',
            height: 200,
            backgroundColor: 'rgba(100, 181, 246, 0.05)',
            backgroundImage: 'linear-gradient(135deg, rgba(100, 181, 246, 0.05) 0%, rgba(100, 181, 246, 0.02) 100%)',
          }}
        >
          <Image
            src={pokemon.imageUrl}
            alt={pokemon.name}
            fill
            style={{ objectFit: 'contain' }}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {pokemon.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            #{pokemon.number}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
            {pokemon.abilities.map((ability) => (
              <Chip
                key={ability.name}
                label={ability.name}
                size="small"
                color={ability.isHidden ? "primary" : "secondary"}
                variant="outlined"
                title={ability.isHidden ? "Hidden Ability" : "Regular Ability"}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

