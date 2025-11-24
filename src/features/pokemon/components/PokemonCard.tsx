'use client';

import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { GRAYSCALE } from '@/lib/theme/pokemonTypes';

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
    <Link href={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: GRAYSCALE.white,
          borderRadius: 2,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        {/* Number Badge - Top Right */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontSize: '10px',
              lineHeight: '16px',
              color: GRAYSCALE.medium,
              fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
            }}
          >
            #{String(pokemon.number).padStart(3, '0')}
          </Typography>
        </Box>

        {/* Pokemon Image Area - White Background */}
        <CardMedia
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 140, sm: 160 },
            backgroundColor: GRAYSCALE.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1,
          }}
        >
          <Image
            src={pokemon.imageUrl}
            alt={`${pokemon.name} - Pokemon #${String(pokemon.number).padStart(3, '0')}`}
            fill
            style={{ objectFit: 'contain', padding: '8px' }}
            priority={false}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        </CardMedia>

        {/* Gray Footer with Pokemon Name */}
        <CardContent
          sx={{
            backgroundColor: GRAYSCALE.background,
            p: 1.5,
            pt: 1,
            flexGrow: 0,
            '&:last-child': {
              pb: 1.5,
            },
          }}
        >
          <Typography
            variant="body1"
            component="div"
            sx={{
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '16px',
              textAlign: 'center',
              textTransform: 'capitalize',
              color: GRAYSCALE.dark,
              fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
            }}
          >
            {pokemon.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

