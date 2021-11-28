"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `
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
//# sourceMappingURL=schema.js.map