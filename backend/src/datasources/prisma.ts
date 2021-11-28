import { DataSource } from 'apollo-datasource';
import { Chat, PrismaClient } from '@prisma/client';

export class PrismaDataSource extends DataSource {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient){
        super();
        this.prisma = prisma;
    }

    //QUERY

    getAllChats = async (): Promise<Chat[]> => await this.prisma.chat.findMany();

    getChat = async (id: number): Promise<Chat | null> => await this.prisma.chat.findFirst({where: {id}});

    //MUTATION

    createChat = async (title: string): Promise<Chat> => await this.prisma.chat.create({data: {title}});

    updateChat = async (id: number, title: string | undefined | null): Promise<Chat> => await this.prisma.chat.update({where: {id}, data: {title: title ?? undefined}});

    removeChat = async (id: number) => await this.prisma.chat.delete({where: {id}})
}