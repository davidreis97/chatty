"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const graphql_scalars_1 = require("graphql-scalars");
exports.resolvers = {
    DateTime: graphql_scalars_1.DateTimeResolver,
    Query: {
        chats: async (_parent, _args, { dataSources: { prismaDS } }, _info) => {
            return await prismaDS.getAllChats();
        },
        chat: async (_parent, args, { dataSources: { prismaDS } }, _info) => {
            return await prismaDS.getChat(args.id);
        }
    },
    Mutation: {
        createChat: async (_parent, args, { dataSources: { prismaDS } }, _info) => {
            return await prismaDS.createChat(args.title);
        },
        updateChat: async (_parent, args, { dataSources: { prismaDS } }, _info) => {
            return await prismaDS.updateChat(args.id, args.title);
        },
        removeChat: async (_parent, args, { dataSources: { prismaDS } }, _info) => {
            await prismaDS.removeChat(args.id);
            return 200;
        },
    }
};
//# sourceMappingURL=resolvers.js.map