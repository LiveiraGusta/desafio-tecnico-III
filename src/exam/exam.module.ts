import { Module } from '@nestjs/common';
import { ExamService } from './services/exam.service';
import { ExamController } from './controllers/exam.controller';

@Module({
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
