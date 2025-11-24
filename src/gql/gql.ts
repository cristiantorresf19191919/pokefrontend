/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    success\n    token\n    message\n  }\n}": typeof types.LoginDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      success\n      token\n      message\n    }\n  }\n": typeof types.LoginDocument,
    "query GetPokemonDetails($id: Int!) {\n  pokemon(id: $id) {\n    id\n    name\n    number\n    imageUrl\n    abilities {\n      name\n      isHidden\n    }\n    moves {\n      name\n      levelLearnedAt\n    }\n    forms {\n      name\n      url\n    }\n  }\n}": typeof types.GetPokemonDetailsDocument,
    "query GetPokemons($first: Int, $after: String, $sortBy: String) {\n  pokemons(first: $first, after: $after, sortBy: $sortBy) {\n    edges {\n      node {\n        id\n        name\n        number\n        imageUrl\n        abilities {\n          name\n          isHidden\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    totalCount\n  }\n}": typeof types.GetPokemonsDocument,
    "query SearchPokemon($query: String!) {\n  searchPokemon(query: $query) {\n    id\n    name\n    imageUrl\n  }\n}": typeof types.SearchPokemonDocument,
    "\n  query GetPokemonDetails($id: Int!) {\n    pokemon(id: $id) {\n      id\n      name\n      number\n      imageUrl\n      abilities {\n        name\n        isHidden\n      }\n      moves {\n        name\n        levelLearnedAt\n      }\n      forms {\n        name\n        url\n      }\n    }\n  }\n": typeof types.GetPokemonDetailsDocument,
    "\n  query GetPokemons($first: Int, $after: String, $sortBy: String) {\n    pokemons(first: $first, after: $after, sortBy: $sortBy) {\n      edges {\n        node {\n          id\n          name\n          number\n          imageUrl\n          abilities {\n            name\n            isHidden\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      totalCount\n    }\n  }\n": typeof types.GetPokemonsDocument,
    "\n  query SearchPokemon($query: String!) {\n    searchPokemon(query: $query) {\n      id\n      name\n      imageUrl\n    }\n  }\n": typeof types.SearchPokemonDocument,
};
const documents: Documents = {
    "mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    success\n    token\n    message\n  }\n}": types.LoginDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      success\n      token\n      message\n    }\n  }\n": types.LoginDocument,
    "query GetPokemonDetails($id: Int!) {\n  pokemon(id: $id) {\n    id\n    name\n    number\n    imageUrl\n    abilities {\n      name\n      isHidden\n    }\n    moves {\n      name\n      levelLearnedAt\n    }\n    forms {\n      name\n      url\n    }\n  }\n}": types.GetPokemonDetailsDocument,
    "query GetPokemons($first: Int, $after: String, $sortBy: String) {\n  pokemons(first: $first, after: $after, sortBy: $sortBy) {\n    edges {\n      node {\n        id\n        name\n        number\n        imageUrl\n        abilities {\n          name\n          isHidden\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    totalCount\n  }\n}": types.GetPokemonsDocument,
    "query SearchPokemon($query: String!) {\n  searchPokemon(query: $query) {\n    id\n    name\n    imageUrl\n  }\n}": types.SearchPokemonDocument,
    "\n  query GetPokemonDetails($id: Int!) {\n    pokemon(id: $id) {\n      id\n      name\n      number\n      imageUrl\n      abilities {\n        name\n        isHidden\n      }\n      moves {\n        name\n        levelLearnedAt\n      }\n      forms {\n        name\n        url\n      }\n    }\n  }\n": types.GetPokemonDetailsDocument,
    "\n  query GetPokemons($first: Int, $after: String, $sortBy: String) {\n    pokemons(first: $first, after: $after, sortBy: $sortBy) {\n      edges {\n        node {\n          id\n          name\n          number\n          imageUrl\n          abilities {\n            name\n            isHidden\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      totalCount\n    }\n  }\n": types.GetPokemonsDocument,
    "\n  query SearchPokemon($query: String!) {\n    searchPokemon(query: $query) {\n      id\n      name\n      imageUrl\n    }\n  }\n": types.SearchPokemonDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    success\n    token\n    message\n  }\n}"): (typeof documents)["mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    success\n    token\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      success\n      token\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      success\n      token\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPokemonDetails($id: Int!) {\n  pokemon(id: $id) {\n    id\n    name\n    number\n    imageUrl\n    abilities {\n      name\n      isHidden\n    }\n    moves {\n      name\n      levelLearnedAt\n    }\n    forms {\n      name\n      url\n    }\n  }\n}"): (typeof documents)["query GetPokemonDetails($id: Int!) {\n  pokemon(id: $id) {\n    id\n    name\n    number\n    imageUrl\n    abilities {\n      name\n      isHidden\n    }\n    moves {\n      name\n      levelLearnedAt\n    }\n    forms {\n      name\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPokemons($first: Int, $after: String, $sortBy: String) {\n  pokemons(first: $first, after: $after, sortBy: $sortBy) {\n    edges {\n      node {\n        id\n        name\n        number\n        imageUrl\n        abilities {\n          name\n          isHidden\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    totalCount\n  }\n}"): (typeof documents)["query GetPokemons($first: Int, $after: String, $sortBy: String) {\n  pokemons(first: $first, after: $after, sortBy: $sortBy) {\n    edges {\n      node {\n        id\n        name\n        number\n        imageUrl\n        abilities {\n          name\n          isHidden\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    totalCount\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchPokemon($query: String!) {\n  searchPokemon(query: $query) {\n    id\n    name\n    imageUrl\n  }\n}"): (typeof documents)["query SearchPokemon($query: String!) {\n  searchPokemon(query: $query) {\n    id\n    name\n    imageUrl\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPokemonDetails($id: Int!) {\n    pokemon(id: $id) {\n      id\n      name\n      number\n      imageUrl\n      abilities {\n        name\n        isHidden\n      }\n      moves {\n        name\n        levelLearnedAt\n      }\n      forms {\n        name\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPokemonDetails($id: Int!) {\n    pokemon(id: $id) {\n      id\n      name\n      number\n      imageUrl\n      abilities {\n        name\n        isHidden\n      }\n      moves {\n        name\n        levelLearnedAt\n      }\n      forms {\n        name\n        url\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPokemons($first: Int, $after: String, $sortBy: String) {\n    pokemons(first: $first, after: $after, sortBy: $sortBy) {\n      edges {\n        node {\n          id\n          name\n          number\n          imageUrl\n          abilities {\n            name\n            isHidden\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GetPokemons($first: Int, $after: String, $sortBy: String) {\n    pokemons(first: $first, after: $after, sortBy: $sortBy) {\n      edges {\n        node {\n          id\n          name\n          number\n          imageUrl\n          abilities {\n            name\n            isHidden\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchPokemon($query: String!) {\n    searchPokemon(query: $query) {\n      id\n      name\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  query SearchPokemon($query: String!) {\n    searchPokemon(query: $query) {\n      id\n      name\n      imageUrl\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;