"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaDataSource = void 0;
const apollo_datasource_1 = require("apollo-datasource");
class PrismaDataSource extends apollo_datasource_1.DataSource {
    constructor(prisma) {
        super();
        //QUERY
        this.getAllChats = async () => await this.prisma.chat.findMany();
        this.getChat = async (id) => await this.prisma.chat.findFirst({ where: { id } });
        //MUTATION
        this.createChat = async (title) => await this.prisma.chat.create({ data: { title } });
        this.updateChat = async (id, title) => await this.prisma.chat.update({ where: { id }, data: { title: title ?? undefined } });
        this.removeChat = async (id) => await this.prisma.chat.delete({ where: { id } });
        this.prisma = prisma;
    }
}
exports.PrismaDataSource = PrismaDataSource;
//# sourceMappingURL=prisma.js.map