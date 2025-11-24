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

---

# 📝 Development Prompts

This section documents the incremental prompts used to build this project step by step.

---

## Prompt 1: Project Setup and Dependencies

```
I just created a Next.js application with the latest version using TypeScript and the App Router. I want to set it up properly for a production-ready frontend.

I need to configure:

- Material-UI (MUI) for the component library
- Apollo Client for GraphQL data fetching
- GraphQL Codegen for type-safe queries
- Zustand for state management
- Make sure it's SEO-friendly with proper metadata configuration
- Use Next.js App Router (not Pages Router)

Can you help me set up the package.json with all the right dependencies? Make sure versions are compatible with Next.js 16 and React 19. Also, I want to make sure we have proper TypeScript configuration. Thanks!
```

---

## Prompt 2: Feature-Based Architecture Scaffolding

```
Now that I have the dependencies, I need help creating the project structure. I want to follow a feature-first approach, similar to domain-driven design, so it's easier to scale and add more features in the future.

I'm thinking of organizing it like this:

**Features** (src/features/):
- auth/ - Authentication feature
  - components/ - LoginForm, LoginModal
  - graphql/ - GraphQL queries/mutations
  - hooks/ - useLogin hook
  - actions/ - Server actions if needed
- pokemon/ - Pokemon feature
  - components/ - PokemonCard, PokedexView, PokemonDetailView, etc.
  - graphql/ - All GraphQL queries
  - hooks/ - usePokemonList, usePokemonDetails, usePokemonSearch
  - stores/ - Zustand stores for filtering/sorting

**Lib** (src/lib/):
- apollo/ - Apollo Client configuration
- theme/ - Material-UI theme setup
- auth/ - Auth provider and store
- loading/ - Loading state management
- graphql/ - RSC client for server-side requests
- hooks/ - Shared hooks like useDebounce

**App** (src/app/):
- Next.js App Router pages
- layout.tsx - Root layout
- pokedex/ - Pokedex page
- pokemon/[id]/ - Pokemon detail page

Can you help me scaffold this structure? I want to make sure everything is organized properly from the start.
```

---

## Prompt 3: Apollo Client Configuration

```
I need help setting up Apollo Client. I've already installed @apollo/client, but I need to configure it properly for Next.js App Router.

Here's what I need:

1. Create Apollo Client instance in lib/apollo/client.ts:
   - Use HttpLink pointing to /api/graphql (we'll create a proxy route later)
   - Set up InMemoryCache
   - Handle SSR properly (ssrMode based on window check)

2. Create ApolloWrapper component in lib/apollo/ApolloWrapper.tsx:
   - Use ApolloProvider to wrap children
   - Make it a client component ('use client')
   - Handle loading state tracking (we'll add a loading link later)

3. Add ApolloWrapper to the root layout.tsx

Also, I want to add a loading link that tracks active requests and shows/hides a global loading indicator. Can you help me set this up? I'm thinking we can use a Zustand store for the loading state.
```

---

## Prompt 4: GraphQL Proxy Route and RSC Client

```
I need to create a GraphQL proxy route in Next.js. The backend GraphQL server is at http://localhost:8082/graphql (or a production URL), but I want to proxy it through Next.js at /api/graphql.

Here's what I need:

1. Create app/api/graphql/route.ts:
   - Handle POST requests
   - Read auth token from HttpOnly cookies (we'll set this up later)
   - Forward the GraphQL request to the backend
   - Include Authorization header if token exists
   - Return the response

2. Also create lib/graphql/rsc-client.ts for server-side requests:
   - This will be used in React Server Components
   - Read cookies using next/headers
   - Make authenticated requests to the GraphQL backend
   - Handle errors properly

The proxy should handle both development (localhost:8082) and production URLs based on environment variables.
```

---

## Prompt 5: GraphQL Codegen Setup

```
I need to set up GraphQL Codegen to generate TypeScript types from my GraphQL schema. I want to use the client preset so I can use typed queries.

Here's what I need:

1. Create codegen.yml configuration:
   - Point to the GraphQL endpoint
   - Use @graphql-codegen/client-preset
   - Output to src/gql/
   - Configure properly for Next.js

2. Add npm scripts:
   - codegen - Generate types (uses env var for URL)
   - codegen:prod - Generate types using production URL
   - Add postinstall script to run codegen automatically

3. Make sure the generated files are properly exported from src/gql/index.ts

Can you help me set this up? I want to make sure the types are generated correctly and I can use them in my components.
```

---

## Prompt 6: Material-UI Theme Configuration

```
I need to set up Material-UI theme properly for Next.js App Router. I have a design system with specific colors:

- Primary color: #DC0A2D (Pokemon red)
- Grayscale colors: dark (#212121), medium (#666666), light (#E0E0E0), background (#EFEFEF), white (#FFFFFF)
- Pokemon type colors (I'll provide a mapping later)

Here's what I need:

1. Create lib/theme/ThemeRegistry.tsx:
   - Set up Emotion cache properly for SSR
   - Create MUI theme with the colors above
   - Configure typography (using Poppins font from Next.js font optimization)
   - Set up CssBaseline
   - Make it a client component

2. Create lib/theme/pokemonTypes.ts:
   - Export color constants
   - Export helper functions for Pokemon type colors
   - Add Pokemon number to type mapping (for when API doesn't return types)

3. Add ThemeRegistry to root layout.tsx

Also, I want to use Next.js font optimization for Poppins font. Can you help me set that up in the layout?
```

---

## Prompt 7: Pokemon List Query and Hook

```
Now I want to create the Pokemon list functionality. I need to:

1. Create the GraphQL query file: src/features/pokemon/graphql/pokemons.graphql
   - Query pokemons with first, after (cursor), and sortBy parameters
   - Return edges with node (id, name, number, imageUrl, abilities) and cursor
   - Return pageInfo (hasNextPage, endCursor) and totalCount

2. Create usePokemonList hook: src/features/pokemon/hooks/usePokemonList.ts
   - Use Apollo's useQuery with the generated query
   - Accept initialData for SSR hydration
   - Handle cursor-based pagination with fetchMore
   - Read sortBy from Zustand store (we'll create the store next)
   - Return pokemons array, loadMore function, hasNextPage, isLoading, error
   - Use cache-first policy if initialData exists, otherwise cache-and-network

3. Create Zustand store: src/features/pokemon/stores/usePokemonFilterStore.ts
   - Store sortBy ('name' | 'number')
   - Store searchQuery (for later)
   - Default sortBy to 'number'

The hook should handle refetching when sortBy changes, and properly merge paginated results. Can you help me implement this?
```

---

## Prompt 8: Pokemon List Component (PokedexView)

```
Now I want to create the main Pokedex view component. This should:

1. Create src/features/pokemon/components/PokedexView.tsx:
   - Use the usePokemonList hook
   - Display Pokemon in a responsive grid (2 cols mobile, 3 tablet, 4 desktop, 5 large)
   - Show a red header with "Pokédex" title and pokeball icon
   - Add a "Load More" button for pagination
   - Show loading state while fetching
   - Handle errors gracefully
   - Accept initialData prop for SSR

2. Create src/app/pokedex/page.tsx:
   - Server component that fetches initial data using RSC client
   - Pass initialData to PokedexView
   - Add proper metadata for SEO

3. Create src/app/page.tsx:
   - Just redirect to /pokedex

The grid should use Material-UI Grid or Box with CSS Grid. Make it look nice with proper spacing and responsive design. Can you help me create this?
```

---

## Prompt 9: Pokemon Card Component

```
I need to create a Pokemon card component that displays each Pokemon in the grid. The card should:

1. Create src/features/pokemon/components/PokemonCard.tsx:
   - Show Pokemon image (centered, white background)
   - Show Pokemon name (capitalized, centered)
   - Show Pokemon number badge (#001 format) in top right
   - Gray footer with Pokemon name
   - Link to /pokemon/[id] using Next.js Link
   - Hover effect (lift up with shadow)
   - Responsive image sizing

The card should follow Material Design principles with proper shadows and transitions. Use the grayscale colors from the theme. Can you help me create this component?
```

---

## Prompt 10: Pokemon Detail Page and Query

```
Now I need to create the Pokemon detail page. This should:

1. Create GraphQL query: src/features/pokemon/graphql/pokemonDetails.graphql
   - Query pokemon by id
   - Return id, name, number, imageUrl, abilities, moves, forms

2. Create usePokemonDetails hook: src/features/pokemon/hooks/usePokemonDetails.ts
   - Use Apollo's useQuery
   - Accept id and initialData
   - Return pokemon, isLoading, error

3. Create PokemonDetailView component: src/features/pokemon/components/PokemonDetailView.tsx
   - Show Pokemon image (large, centered)
   - Show Pokemon name and number
   - Show abilities, moves, forms
   - Add back button to go to pokedex
   - Use Pokemon type color for header background
   - Responsive design (mobile-first)

4. Create src/app/pokemon/[id]/page.tsx:
   - Server component that fetches initial data
   - Generate metadata for SEO (title, description, OpenGraph)
   - Pass initialData to PokemonDetailView

The detail page should be SEO-optimized with proper metadata. Can you help me implement this?
```

---

## Prompt 11: Pokemon Search Functionality

```
I want to add search functionality to find Pokemon by name. Here's what I need:

1. Create GraphQL query: src/features/pokemon/graphql/searchPokemon.graphql
   - Query searchPokemon with query parameter
   - Return id, name, imageUrl (preview format)

2. Create usePokemonSearch hook: src/features/pokemon/hooks/usePokemonSearch.ts
   - Use Apollo's useLazyQuery
   - Debounce search input (350ms) - create lib/hooks/useDebounce.ts
   - Cache search results in memory (Map with 5min TTL)
   - Handle loading and error states
   - Cancel previous requests when new search starts
   - Return searchQuery, setSearchQuery, results, isLoading, error, clearSearch

3. Create PokemonSearchAutocomplete component: src/features/pokemon/components/PokemonSearchAutocomplete.tsx
   - Use MUI Autocomplete component
   - Show Pokemon image and name in dropdown
   - Highlight matching text
   - Navigate to Pokemon detail on select
   - Show loading indicator
   - Custom styling to match design

4. Add the search component to PokedexView header

The search should be debounced and efficient. Can you help me implement this?
```

---

## Prompt 12: Sorting and Filter Dialog

```
I need to add sorting functionality. I want:

1. Create SortDialog component: src/features/pokemon/components/SortDialog.tsx
   - MUI Dialog with radio buttons
   - Options: "Number" and "Name"
   - Red header matching design
   - Read/write to Zustand store
   - Close on selection

2. Add sort button to PokedexView:
   - Button with sort icon
   - Shows current sort option
   - Opens SortDialog
   - Positioned next to search bar

3. Update usePokemonList hook:
   - Refetch when sortBy changes
   - Reset to first page when sorting changes

The sort dialog should match the Pokemon design system (red header, white body). Can you help me create this?
```

---

## Prompt 13: Authentication Setup

```
I need to set up authentication. The backend has a login mutation that returns a JWT token. Here's what I need:

1. Create GraphQL mutation: src/features/auth/graphql/login.graphql
   - Mutation login(username, password)
   - Returns success, token, message

2. Create useLogin hook: src/features/auth/hooks/useLogin.ts
   - Use Apollo's useMutation
   - Store token in cookie (js-cookie) with HttpOnly-like security (path: '/', sameSite: 'lax', 7 days expiry)
   - Update auth store (we'll create it next)
   - Return login function, isLoading, error

3. Create auth store: src/lib/auth/useAuthStore.ts
   - Zustand store for auth state
   - Store token, isAuthenticated
   - Methods: setAuth, clearAuth, checkAuth

4. Create AuthProvider: src/lib/auth/AuthProvider.tsx
   - Check auth on mount and route changes
   - Show login modal if not authenticated (except on /login)
   - Handle public routes

5. Create LoginForm component: src/features/auth/components/LoginForm.tsx
   - MUI form with username/password fields
   - Use useLogin hook
   - Redirect to /pokedex on success
   - Show error messages

6. Create LoginModal component: src/features/auth/components/LoginModal.tsx
   - MUI Dialog wrapper for LoginForm
   - Show when not authenticated

7. Add AuthProvider to root layout

Can you help me implement this authentication flow?
```

---

## Prompt 14: Loading State Management

```
I want to add a global loading indicator that shows when any GraphQL request is in progress. Here's what I need:

1. Create loading store: src/lib/loading/useLoadingStore.ts
   - Zustand store with isLoading state
   - setLoading method

2. Update Apollo loading link in lib/apollo/client.ts:
   - Track active requests count
   - Set loading to true when request starts
   - Set loading to false when all requests complete
   - Add small delay (100ms) to prevent flickering on fast requests

3. Create LoadingModal component: src/lib/loading/LoadingModal.tsx
   - MUI Backdrop with CircularProgress
   - Show when isLoading is true

4. Create LoadingProvider: src/lib/loading/LoadingProvider.tsx
   - Wrapper that shows LoadingModal based on store
   - Add to root layout

5. Also update usePokemonList and useLogin hooks to set loading state

The loading indicator should be global and work for all GraphQL requests. Can you help me set this up?
```

---

## Prompt 15: SEO Optimization and Metadata

```
I need to improve SEO for the Pokemon pages. Here's what I need:

1. Update root layout.tsx metadata:
   - Add comprehensive metadata (title, description, keywords, OpenGraph, Twitter)
   - Use environment variable for site URL
   - Add structured data support

2. Update pokedex page metadata:
   - Dynamic description with total Pokemon count
   - Proper OpenGraph tags
   - Canonical URL

3. Update pokemon detail page metadata:
   - Dynamic title with Pokemon name and number
   - Description with abilities and moves info
   - OpenGraph image using Pokemon imageUrl
   - Keywords including Pokemon name and abilities

4. Create StructuredData component: src/lib/seo/StructuredData.tsx
   - Output JSON-LD structured data
   - Use for Pokemon detail pages (Thing schema)

5. Add robots.ts and sitemap.ts:
   - robots.ts - Allow all crawlers
   - sitemap.ts - Generate sitemap (optional, can be basic)

The metadata should be dynamic and SEO-friendly. Can you help me implement this?
```

---

## Prompt 16: Middleware and Route Protection

```
I need to set up middleware for route protection. Here's what I need:

1. Create middleware.ts in root:
   - Check for auth_token cookie
   - Allow public routes (/login, /api/*)
   - For protected routes, let them through but AuthProvider will handle showing login modal
   - This allows client-side navigation to work smoothly

2. Update AuthProvider:
   - Check authentication on route changes
   - Show login modal for protected routes
   - Handle redirect after login

The middleware should work with the AuthProvider to protect routes while allowing smooth client-side navigation. Can you help me set this up?
```

---

## Prompt 17: Pokemon Detail View Enhancement

```
I want to enhance the Pokemon detail view to match a design I have. The detail page should:

1. Update PokemonDetailView component:
   - Split layout: colored header (left/top) with Pokemon image, white content area (right/bottom)
   - Header color based on Pokemon type (use getPokemonTypeColor)
   - Show Pokemon types as chips
   - Add navigation arrows (previous/next Pokemon)
   - Show stats with progress bars (HP, Attack, Defense, etc.)
   - Show physical data (weight, height)
   - Show description text
   - Add pokeball pattern in header background
   - Responsive: stacked on mobile, side-by-side on desktop

2. Update pokemonTypes.ts:
   - Add getPokemonStats function (mock data for now)
   - Add getPokemonPhysicalData function (mock data)
   - Add getPokemonDescription function (mock data)
   - These can be replaced with API data later

3. Add proper image optimization:
   - Use Next.js Image component
   - Proper sizing and priority loading

The design should be mobile-first and match Pokemon app aesthetics. Can you help me implement this?
```

---

## Prompt 18: Refactoring and Code Organization

```
I want to refactor some code to make it cleaner. Can you help me:

1. Move all GraphQL queries to separate .graphql files:
   - pokemons.graphql
   - pokemonDetails.graphql
   - searchPokemon.graphql
   - login.graphql

2. Update hooks to use the graphql() function from codegen instead of gql template literals

3. Make sure all components are properly typed with TypeScript

4. Ensure proper error handling throughout

5. Add proper loading states everywhere

Also, I noticed the search query doesn't return the number field. Can you add that to the searchPokemon query and update the search results display to show it?

Let me know if there are any other improvements we should make!
```

---

## Prompt 19: Server-Side Rendering Optimization

```
I want to make sure the SSR is working properly. Can you help me:

1. Update PokedexView to properly hydrate with initialData:
   - Write initialData to Apollo cache on mount
   - Use cache-first policy when initialData exists
   - Handle the case where initialData might be null

2. Update PokemonDetailView to handle SSR properly:
   - Same cache hydration pattern
   - Handle loading and error states

3. Make sure the RSC client properly handles cookies:
   - Read HttpOnly cookies in server components
   - Forward auth token to backend

4. Test that the pages work with JavaScript disabled (for SEO)

The goal is to have proper SSR with Apollo cache hydration so there's no flash of loading state. Can you help me optimize this?
```

---

## Prompt 20: Final Polish and Bug Fixes

```
I've noticed a few issues and want to polish the app:

1. Fix the search - it should show the number field in results (I think we added it but want to make sure it displays)

2. Make sure pagination resets when sorting changes

3. Add proper error boundaries (or at least better error handling)

4. Ensure all images have proper alt text for accessibility

5. Add proper ARIA labels where needed

6. Make sure the loading states don't flicker

7. Test the authentication flow end-to-end

8. Make sure the middleware doesn't block API routes

Also, can you review the code and suggest any other improvements? I want to make sure everything is production-ready!
```

## Gen AI Questions for table generation
The Prompt:

"I need to build a backend for a simple Kanban-style task manager using Kotlin and Spring Boot 3.

Can you scaffold the API for me?

Core Requirements:

Use Spring Data JPA with H2 (or Postgres) for the DB.

I need a Task entity. It should have: title, description, status (TODO, IN_PROGRESS, DONE), and a due_date.

The Task needs to be linked to a User entity (just assume User exists for now with a simple ManyToOne).

Create the Repository, Service, and Controller layers.

Standard CRUD endpoints.

Important:

Please use Constructor Injection (don't use @Autowired on fields).

Use Kotlin data classes for DTOs.

Keep the controller clean."


Validated the AI's suggestions I mostly looked at the structure first. I wanted to make sure it wasn't using outdated Java patterns in Kotlin code.

Dependency Injection: I checked if it actually listened to my request for Constructor Injection. AI models love putting @Autowired directly on fields, which makes testing a pain. Fortunately, it generated a primary constructor for the TaskService, which is what I wanted.

Null Safety: I skimmed the Entity model to see if it handled nullables correctly. For example, description should probably be nullable (String?), but title shouldn't. The AI initially made everything non-nullable, so I had to check if that matched my database constraints.

JPA Annotations: I verified it used @ManyToOne and @JoinColumn correctly for the User relationship.

Corrected or improved the output, if necessary The code was runnable but not "production ready" so I made a few tweaks:

DTOs vs Entities: The AI tried to return the Task entity directly from the Controller. That’s a bad practice because it exposes the DB structure. I manually refactored it to map the entity to a TaskResponseDTO before returning it.

Mutable Lists: It used var for the list of tasks in the User entity. I changed it to a val with a MutableList or just removed the bidirectional mapping entirely to keep it simple, as I prefer querying from the Task side.

Service Layer Logic: It put the "update" logic directly in the controller. I moved that logic into the TaskService to keep the controller thin.

3. Handled edge cases, authentication, or validations The scaffold was pretty happy-path, so I had to add the safety rails:

Validation: The AI forgot to validate inputs. I added jakarta.validation annotations like @NotBlank on the title and @FutureOrPresent on the due_date in the DTO, and added @Valid in the controller parameters.

Auth context: The generated code assumed any user could edit any task. I added a check in the Service to ensure the currentUser.id matches the task.user.id before allowing an update or delete.

404s: It used orElse(null) for finding tasks. I changed this to orElseThrow { EntityNotFoundException(...) } so the API returns a proper 404 error instead of just crashing or returning 200 OK with empty body.

4. Assessed the performance and idiomatic quality of the code

Kotlin Idioms: The code was decent, but I cleaned up some syntax. It wrote out full if (optional.isPresent()) blocks. I replaced those with Kotlin's scope functions like .let {} or .orElseThrow which looks much cleaner.

N+1 Problem: Since we are loading Tasks with Users, I checked the repository query. The default findAll might trigger N+1 queries if we serialize the User object. I decided to just return the userId in the DTO to avoid lazy loading issues completely for this simple view.