import { Module } from '@nestjs/common';
import { PrismaService } from './shared/prisma/prisma.service';
import { PrismaModule } from './shared/prisma/prisma.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [PrismaModule, PatientModule],
  providers: [PrismaService],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
