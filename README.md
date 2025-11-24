This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Architecture

This project uses a **feature-first architecture** with:
- **Next.js 16** (App Router) for SEO-friendly server-side rendering
- **Apollo Client** for GraphQL data fetching and caching
- **Zustand** for client-side state management (filtering, sorting)
- **Material UI** for the component library
- **GraphQL Codegen** for type-safe GraphQL queries

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Environment variables are automatically loaded based on your environment:

- **Local Development**: Uses `.env.local` (already created with `http://localhost:8082/graphql`)
- **Production**: Uses `.env.production` (already created with Azure URL)

The `.env.local` file is already configured for local development. If you need to customize it, copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

**Environment Files:**
- `.env.local` - Local development (port 8082)
- `.env.production` - Production (Azure URL)
- `.env.example` - Example template

### 3. Generate GraphQL Types

GraphQL types are automatically generated after `npm install` via the `postinstall` script. You can also run it manually:

```bash
npm run codegen
```

**Available Codegen Commands:**
- `npm run codegen` - Uses `NEXT_PUBLIC_GRAPHQL_URL` from your environment
- `npm run codegen:local` - Forces local development URL
- `npm run codegen:prod` - Forces production URL

**Important:** Make sure your GraphQL server is running before running codegen. The postinstall script will fail gracefully if the server is not available.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The app will automatically redirect to `/pokedex` where you can browse Pokemon.

## Project Structure

```
src/
  app/                        # Next.js App Router (Pages/Routes)
    layout.tsx                # Wraps ApolloWrapper & ThemeRegistry
    page.tsx                  # Redirects to /pokedex
    pokedex/                  # Pokedex listing page
    pokemon/[id]/             # Pokemon detail page (SEO optimized)
  features/
    auth/                     # Authentication feature
      components/             # LoginForm.tsx
      graphql/                # login.graphql
      hooks/                  # useLogin.ts
    pokemon/                  # Pokemon feature
      components/             # PokemonList, PokemonCard, etc.
      graphql/                # GraphQL queries
      hooks/                  # usePokemonList, usePokemonDetails
      stores/                 # Zustand stores (filtering)
  lib/
    apollo/                   # Apollo Client setup (SSR + Client)
    graphql/                  # Codegen configuration
    theme/                    # MUI Theme Registry
  gql/                        # Generated GraphQL types (run codegen first!)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run codegen` - Generate TypeScript types from GraphQL schema (uses env var)
- `npm run codegen:local` - Generate types using local development URL
- `npm run codegen:prod` - Generate types using production URL

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
