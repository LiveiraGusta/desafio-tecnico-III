import { Module } from '@nestjs/common';
import { PrismaService } from './shared/prisma/prisma.service';
import { PrismaModule } from './shared/prisma/prisma.module';
import { PatientModule } from './patient/patient.module';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [PrismaModule, PatientModule, ExamModule],
  providers: [PrismaService],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
