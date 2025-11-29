import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
    imports: [PrismaService],
    providers: [PrismaService],
})
export class PrismaModule {}
