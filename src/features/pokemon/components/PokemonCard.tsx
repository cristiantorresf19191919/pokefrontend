'use client';

import { Card, CardContent, CardMedia, Typography, Chip, Box, alpha } from '@mui/material';
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
    <Link href={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            '& .pokemon-image': {
              transform: 'scale(1.1)',
            },
            '& .pokemon-number': {
              opacity: 1,
            },
          },
        }}
      >
        {/* Number Badge */}
        <Box
          className="pokemon-number"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1,
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            background: alpha('#64b5f6', 0.2),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#64b5f6', 0.3)}`,
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: '#9be7ff',
              fontSize: '0.75rem',
            }}
          >
            #{String(pokemon.number).padStart(3, '0')}
          </Typography>
        </Box>

        <CardMedia
          className="pokemon-image"
          sx={{
            position: 'relative',
            width: '100%',
            height: 240,
            backgroundColor: alpha('#64b5f6', 0.03),
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(100, 181, 246, 0.1) 0%, transparent 70%)',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Image
            src={pokemon.imageUrl}
            alt={`${pokemon.name} - Pokemon #${String(pokemon.number).padStart(3, '0')}`}
            fill
            style={{ objectFit: 'contain', padding: '16px' }}
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </CardMedia>
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 2.5,
            pt: 2,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              mb: 0.5,
              textTransform: 'capitalize',
              background: 'linear-gradient(135deg, #e8e8f0 0%, #b0b0c0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {pokemon.name}
          </Typography>
          {pokemon.abilities.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                gap: 0.75,
                flexWrap: 'wrap',
                mt: 'auto',
                pt: 1.5,
              }}
            >
              {pokemon.abilities.slice(0, 2).map((ability) => (
                <Chip
                  key={ability.name}
                  label={ability.name}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    background: ability.isHidden
                      ? alpha('#64b5f6', 0.2)
                      : alpha('#9be7ff', 0.15),
                    color: ability.isHidden ? '#9be7ff' : '#b0b0c0',
                    border: `1px solid ${ability.isHidden ? alpha('#64b5f6', 0.4) : alpha('#9be7ff', 0.3)}`,
                    '&:hover': {
                      background: ability.isHidden
                        ? alpha('#64b5f6', 0.3)
                        : alpha('#9be7ff', 0.25),
                    },
                  }}
                  title={ability.isHidden ? 'Hidden Ability' : 'Regular Ability'}
                />
              ))}
              {pokemon.abilities.length > 2 && (
                <Chip
                  label={`+${pokemon.abilities.length - 2}`}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: '0.7rem',
                    background: alpha('#64b5f6', 0.1),
                    color: '#b0b0c0',
                    border: `1px solid ${alpha('#64b5f6', 0.2)}`,
                  }}
                />
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

