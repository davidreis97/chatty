"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const apollo_server_1 = require("apollo-server");
const prisma_1 = require("./datasources/prisma");
const resolvers_1 = require("./resolvers");
const schema_1 = require("./schema");
const prisma = new client_1.PrismaClient();
const prismaDS = new prisma_1.PrismaDataSource(prisma);
const dataSources = () => ({ prismaDS });
const server = new apollo_server_1.ApolloServer({ resolvers: resolvers_1.resolvers, typeDefs: schema_1.typeDefs, dataSources });
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
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=start.js.map