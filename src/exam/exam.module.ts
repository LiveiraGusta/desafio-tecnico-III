import { Module } from '@nestjs/common';
import { ExamService } from './services/exam.service';
import { ExamController } from './controllers/exam.controller';
import { PatientService } from '../patient/services/patient.service';

@Module({
  controllers: [ExamController],
  providers: [ExamService, PatientService],
})
export class ExamModule {}
