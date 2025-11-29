import { Injectable, OnModuleInit, OnModuleDestroy, INestApplication, Logger } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';
import "dotenv/config";
 
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
  private readonly logger = new Logger(PrismaService.name);

  constructor(){
    const adapter = new PrismaPg({connectionString : process.env.DATABASE_URL });
    super({adapter});
  }

  async onModuleInit() {
    try {
      await this.$queryRaw`SELECT 1`;
      this.logger.log('Database connection established successfully');
    } catch (error) {
      this.logger.error('Erro ao conectar no banco de dados', error.stack);
      throw error; 
    }
  }
  
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
