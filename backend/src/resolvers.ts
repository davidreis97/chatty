import { PrismaDataSource } from './datasources/prisma';
import { Chat, Maybe, QueryChatArgs, RequireFields, Resolvers, ResolverTypeWrapper } from './generated/graphql'
import { DateTimeResolver } from 'graphql-scalars';

export type DataSources = {
    prismaDS: PrismaDataSource
}

export type Context = {
    dataSources: DataSources
}

export const resolvers: Resolvers<Context> = {
    DateTime: DateTimeResolver,
    Query: {
        chats: async (_parent, _args, {dataSources: {prismaDS}}, _info): Promise<Chat[]> => {
            return await prismaDS.getAllChats();
        },
        chat: async (_parent, args, {dataSources: {prismaDS}}, _info): Promise<Chat | null> => {
            return await prismaDS.getChat(args.id);
        }
    },
    Mutation: {
        createChat: async (_parent, args, {dataSources: {prismaDS}}, _info): Promise<Chat> => {
            return await prismaDS.createChat(args.title);
        },
        updateChat: async (_parent, args, {dataSources: {prismaDS}}, _info): Promise<Chat> => {
            return await prismaDS.updateChat(args.id, args.title);
        },
        removeChat: async (_parent, args, {dataSources: {prismaDS}}, _info): Promise<number> => {
            await prismaDS.removeChat(args.id);
            return 200;
        },
    }
}
