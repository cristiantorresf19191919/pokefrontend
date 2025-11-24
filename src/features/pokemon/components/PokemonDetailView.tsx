'use client';

import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Container,
  Fade,
  IconButton,
  LinearProgress,
} from '@mui/material';
import Image from 'next/image';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { GetPokemonDetailsQuery } from '@/gql/graphql';
import {
  PRIMARY_COLOR,
  GRAYSCALE,
  getPokemonTypesByNumber,
  getPokemonTypeColor,
  getPokemonStats,
  getPokemonPhysicalData,
  getPokemonDescription,
} from '@/lib/theme/pokemonTypes';
import { useRouter } from 'next/navigation';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface PokemonDetailViewProps {
  id: number;
  initialData?: GetPokemonDetailsQuery | null;
}

// Helper to get primary type color for the header
const getHeaderColor = (number: number): string => {
  const types = getPokemonTypesByNumber(number);
  return getPokemonTypeColor(types[0]);
};

// Helper to calculate stat percentage (max is 255, but we'll use 150 for better visual representation)
const getStatPercentage = (value: number): number => {
  return Math.min((value / 150) * 100, 100);
};

export const PokemonDetailView = ({ id, initialData }: PokemonDetailViewProps) => {
  const { pokemon, isLoading, error } = usePokemonDetails(id, initialData);
  const router = useRouter();
  const headerColor = pokemon ? getHeaderColor(pokemon.number) : PRIMARY_COLOR;
  const types = pokemon ? getPokemonTypesByNumber(pokemon.number) : ['normal'];
  const stats = pokemon ? getPokemonStats(pokemon.number) : null;
  const physicalData = pokemon ? getPokemonPhysicalData(pokemon.number) : null;
  const description = pokemon ? getPokemonDescription(pokemon.number) : '';

  const defaultHeaderColor = PRIMARY_COLOR;

  const handlePrevious = () => {
    if (pokemon && pokemon.number > 1) {
      router.push(`/pokemon/${pokemon.number - 1}`);
    }
  };

  const handleNext = () => {
    if (pokemon) {
      router.push(`/pokemon/${pokemon.number + 1}`);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: defaultHeaderColor }}>
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={48} sx={{ color: GRAYSCALE.white }} />
            <Typography
              variant="body2"
              sx={{
                color: GRAYSCALE.white,
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              }}
            >
              Loading Pokémon details...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error || !pokemon) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: defaultHeaderColor }}>
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Box
            sx={{
              textAlign: 'center',
              p: 4,
              borderRadius: 2,
              backgroundColor: GRAYSCALE.white,
              border: `1px solid ${GRAYSCALE.light}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: PRIMARY_COLOR,
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              }}
              gutterBottom
            >
              {error ? 'Error loading Pokémon' : 'Pokémon not found'}
            </Typography>
            {error && (
              <Typography
                variant="body2"
                sx={{
                  color: GRAYSCALE.medium,
                  fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                }}
              >
                {error.message}
              </Typography>
            )}
          </Box>
        </Container>
      </Box>
    );
  }

  const statLabels = [
    { key: 'hp', label: 'HP', value: stats?.hp || 0 },
    { key: 'attack', label: 'ATK', value: stats?.attack || 0 },
    { key: 'defense', label: 'DEF', value: stats?.defense || 0 },
    { key: 'specialAttack', label: 'SATK', value: stats?.specialAttack || 0 },
    { key: 'specialDefense', label: 'SDEF', value: stats?.specialDefense || 0 },
    { key: 'speed', label: 'SPD', value: stats?.speed || 0 },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: headerColor, position: 'relative' }}>
      <Fade in timeout={400}>
        <article itemScope itemType="https://schema.org/Thing" style={{ position: 'relative', height: '100%' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: '100vh'
          }}>
            {/* Colored Header with Pokemon Image */}
            <Box
              sx={{
                backgroundColor: headerColor,
                position: 'relative',
                minHeight: { xs: '40vh', md: '100vh' },
                width: { xs: '100%', md: '50%' },
                pb: { xs: 0, sm: 0 },
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
            {/* Pokeball pattern in background using SVG */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: '3%', sm: '5%', md: '8%', lg: '10%', xl: '12%' },
                right: { xs: '-1rem', sm: '-1.5rem', md: '-2rem', lg: '-2.5rem', xl: '-3rem' },
                width: { xs: '19rem', sm: '23rem', md: '27rem', lg: '31rem', xl: '35rem' },
                height: { xs: '246px', sm: '288px', md: '336px', lg: '384px', xl: '432px' },
                opacity: 0.1,
                zIndex: 0,
              }}
            >
              <Image
                src="/pokeball.svg"
                alt=""
                fill
                style={{ objectFit: 'contain' }}
                aria-hidden="true"
              />
            </Box>

            {/* Top Bar with Back Button, Name, and Number */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: { xs: 2, sm: 3 },
                pt: { xs: 2, sm: 3 },
                pb: 2,
                gap: 2,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <IconButton
                onClick={() => router.back()}
                sx={{
                  color: GRAYSCALE.white,
                  p: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <Image
                  src="/backButton.svg"
                  alt="Back"
                  width={24}
                  height={24}
                />
              </IconButton>
              <Typography
                variant="h1"
                component="h1"
                itemProp="name"
                sx={{
                  flex: 1,
                  fontWeight: 700,
                  fontSize: { xs: '20px', sm: '24px' },
                  lineHeight: { xs: '28px', sm: '32px' },
                  color: GRAYSCALE.white,
                  textTransform: 'capitalize',
                  fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                }}
              >
                {pokemon.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '16px', sm: '18px' },
                  lineHeight: { xs: '24px', sm: '26px' },
                  color: GRAYSCALE.white,
                  fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                }}
                itemProp="identifier"
              >
                #{String(pokemon.number).padStart(3, '0')}
              </Typography>

            </Box>

            {/* Pokemon Image with Navigation Arrows */}
            <Box
              sx={{
                position: { xs: 'absolute', md: 'relative' },
                bottom: { xs: -40, sm: -60, md: 'auto' },
                top: { md: '50%' },
                left: '50%',
                transform: { xs: 'translateX(-50%)', md: 'translate(-50%, -50%)' },
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: { xs: 2, sm: 4 },
                zIndex: 999,
                pointerEvents: 'none',
                flex: { md: 1 },
              }}
            >
              {/* Left Arrow */}
              {pokemon.number > 1 && (
                <IconButton
                  onClick={handlePrevious}
                  sx={{
                    color: GRAYSCALE.white,
                    position: 'absolute',
                    left: { xs: 4, sm: 8, md: 16 },
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    width: { xs: 32, sm: 36, md: 40 },
                    height: { xs: 32, sm: 36, md: 40 },
                    pointerEvents: 'all',
                    zIndex: 1000,
                  }}
                >
                  <ArrowLeftIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
                </IconButton>
              )}

              {/* Pokemon Image */}
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 280, sm: 340, md: 400, lg: 450 },
                  height: { xs: 280, sm: 340, md: 400, lg: 450 },
                }}
              >
                <Image
                  src={pokemon.imageUrl}
                  alt={`${pokemon.name} - Pokemon #${String(pokemon.number).padStart(3, '0')} - Official artwork`}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  sizes="(max-width: 600px) 280px, (max-width: 900px) 340px, (max-width: 1200px) 400px, 450px"
                />
              </Box>

              {/* Right Arrow */}
              <IconButton
                onClick={handleNext}
                sx={{
                  color: GRAYSCALE.white,
                  position: 'absolute',
                  right: { xs: 4, sm: 8, md: 16 },
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  width: { xs: 32, sm: 36, md: 40 },
                  height: { xs: 32, sm: 36, md: 40 },
                  pointerEvents: 'all',
                  zIndex: 1000,
                }}
              >
                <ArrowRightIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
              </IconButton>
            </Box>
            </Box>


          <Container 
            maxWidth={false}
            sx={{ 
              px: { xs: 0, md: 0 }, 
              mt: { xs: 0, md: 0 }, 
              position: 'relative', 
              zIndex: 1,
              pb: { xs: 0, md: 0 },
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: { md: 'center' },
              backgroundColor: { md: GRAYSCALE.white },
            }}
          >
            {/* White Content Card */}
            <Box
              sx={{
                backgroundColor: GRAYSCALE.white,
                borderRadius: { xs: '24px 24px 0 0', md: 0 },
                p: { xs: 3, sm: 4, md: 8 },
                boxShadow: { xs: '0px -4px 8px rgba(0, 0, 0, 0.1)', md: 'none' },
                position: 'relative',
                zIndex: 1,
                minHeight: { xs: '60vh', md: '100vh' },
                marginTop: { xs: '35vh', md: 0 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: { md: 'center' },
              }}
            >
              {/* Type Badges */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1.5,
                  mb: 3,
                  mt: { xs: 6, sm: 8, md: 0 },
                }}
              >
                {types.map((type, index) => (
                  <Chip
                    key={index}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                    sx={{
                      height: 28,
                      fontWeight: 700,
                      fontSize: '12px',
                      lineHeight: '16px',
                      backgroundColor: getPokemonTypeColor(type),
                      color: GRAYSCALE.white,
                      borderRadius: '10px',
                      fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                      px: 2,
                    }}
                  />
                ))}
              </Box>

              {/* About Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '16px',
                    textAlign: 'center',
                    mb: 3,
                    color: headerColor,
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                  }}
                >
                  About
                </Typography>

                {/* Weight, Height, Moves Row */}
                <Box sx={{ display: 'flex', gap: 0, mb: 3, alignItems: 'center' }}>
                  {/* Weight */}
                  <Box sx={{ flex: 1, minWidth: 0, px: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 1.5,
                          height: 20,
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Image
                          src="/weight.svg"
                          alt="Weight"
                          width={16}
                          height={16}
                          style={{ filter: 'brightness(0)' }} 
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 400,
                            fontSize: '10px',
                            lineHeight: '16px',
                            color: GRAYSCALE.dark,
                            fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                          }}
                        >
                          {physicalData?.weight ? `${physicalData.weight.toFixed(1).replace('.', ',')} kg` : '—'}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 400,
                          fontSize: '8px',
                          lineHeight: '12px',
                          color: GRAYSCALE.medium,
                          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                          mt: 1,
                        }}
                      >
                        Weight
                      </Typography>
                    </Box>
                  </Box>

                  {/* Divider */}
                  <Box sx={{ width: '1px', height: '48px', backgroundColor: GRAYSCALE.light }} />

                  {/* Height */}
                  <Box sx={{ flex: 1, minWidth: 0, px: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 1.5,
                          height: 20,
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                         <Image
                          src="/height.svg"
                          alt="Height"
                          width={8}
                          height={16}
                          style={{ filter: 'brightness(0)' }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 400,
                            fontSize: '10px',
                            lineHeight: '16px',
                            color: GRAYSCALE.dark,
                            fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                          }}
                        >
                          {physicalData?.height ? `${physicalData.height.toFixed(1).replace('.', ',')} m` : '—'}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 400,
                          fontSize: '8px',
                          lineHeight: '12px',
                          color: GRAYSCALE.medium,
                          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                          mt: 1,
                        }}
                      >
                        Height
                      </Typography>
                    </Box>
                  </Box>

                  {/* Divider */}
                  <Box sx={{ width: '1px', height: '48px', backgroundColor: GRAYSCALE.light }} />

                  {/* Moves */}
                  <Box sx={{ flex: 1, minWidth: 0, px: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          minHeight: 20,
                          mb: 1.5,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {pokemon.moves && pokemon.moves.length > 0 ? (
                          pokemon.moves.slice(0, 2).map((move: { name: string }, idx: number) => (
                            <Typography
                              key={idx}
                              variant="body1"
                              sx={{
                                fontWeight: 400,
                                fontSize: '10px',
                                lineHeight: '16px',
                                color: GRAYSCALE.dark,
                                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {move.name.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('-')}
                            </Typography>
                          ))
                        ) : (
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 400,
                              fontSize: '10px',
                              lineHeight: '16px',
                              color: GRAYSCALE.dark,
                              fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                            }}
                          >
                            —
                          </Typography>
                        )}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 400,
                          fontSize: '8px',
                          lineHeight: '12px',
                          color: GRAYSCALE.medium,
                          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                          mt: 0.5,
                        }}
                      >
                        Moves
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Description */}
                {description && (
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: GRAYSCALE.dark,
                      fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                      textAlign: 'left',
                      mb: 3,
                    }}
                  >
                    {description}
                  </Typography>
                )}
              </Box>

              {/* Base Stats Section */}
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '16px',
                    textAlign: 'center',
                    mb: 3,
                    color: headerColor,
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                  }}
                >
                  Base Stats
                </Typography>

                {/* Stats List */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {statLabels.map((stat) => {
                    const percentage = getStatPercentage(stat.value);
                    return (
                      <Box
                        key={stat.key}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: { xs: 1.5, sm: 2 },
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            fontSize: '12px',
                            lineHeight: '16px',
                            color: headerColor,
                            minWidth: { xs: 45, sm: 50 },
                            fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                          }}
                        >
                          {stat.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '16px',
                            color: GRAYSCALE.dark,
                            minWidth: { xs: 35, sm: 40 },
                            fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                            textAlign: 'right',
                          }}
                        >
                          {String(stat.value).padStart(3, '0')}
                        </Typography>
                        <Box sx={{ flex: 1, position: 'relative' }}>
                          <LinearProgress
                            variant="determinate"
                            value={percentage}
                            sx={{
                              height: { xs: 6, sm: 8 },
                              borderRadius: 4,
                              backgroundColor: GRAYSCALE.background,
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: headerColor,
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>

          </Container>
          </Box>
        </article>
      </Fade>
    </Box>
  );
};
