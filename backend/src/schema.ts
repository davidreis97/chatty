import { gql } from 'apollo-server';

export const typeDefs = gql`
    scalar DateTime

    type Chat {
        id: Int!
        createdAt: DateTime!
        title: String!
    }

    type Query {
        chats: [Chat]!
        chat(id: Int!): Chat
    }

    type Mutation {
        createChat(title: String!): Chat!
        updateChat(id: Int!, title: String): Chat!
        removeChat(id: Int!): Int!
    }
`;