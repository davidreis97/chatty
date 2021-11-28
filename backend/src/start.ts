import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server';
import { PrismaDataSource } from './datasources/prisma';
import { DataSources, resolvers } from './resolvers';
import { typeDefs } from './schema';

const prisma = new PrismaClient();
const prismaDS = new PrismaDataSource(prisma);
const dataSources = (): DataSources => ({ prismaDS });
const server = new ApolloServer({ resolvers, typeDefs, dataSources });

async function main() {
    server.listen().then(() => {
        console.log(`
            Server is running!
            Listening on port 4000
            Explore at https://studio.apollographql.com/sandbox
        `);
    });
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    });