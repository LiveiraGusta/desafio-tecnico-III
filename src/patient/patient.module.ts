import { Module } from '@nestjs/common';
import { PatientController } from './controllers/patient.controller';
import { PatientService } from './services/patient.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';


@Module({
  controllers: [PatientController],
  providers: [PatientService, PrismaService],
  exports: [PatientService]
})
export class PatientModule {}
