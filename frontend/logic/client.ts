import {
    ApolloClient,
    gql,
    NormalizedCacheObject
} from '@apollo/client';
import { cache } from './cache';

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    uri: 'http://localhost:4000/graphql' //TODO - CHANGE
});

export const createChat = gql`
  mutation Mutation($title: String!) {
    createChat(title: $title) {
      id
      createdAt
      title
    }
  }`