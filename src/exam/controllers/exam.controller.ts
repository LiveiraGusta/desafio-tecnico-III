import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ExamService } from '../services/exam.service';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { UpdateExamDto } from '../dtos/update-exam.dto';
import { QueryExamsDto } from '../dtos/query-exam.dto';

@Controller('exames')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }

  @Get()
  findAll(@Query() query: QueryExamsDto) {
    return this.examService.findAll(query);
  }

}
