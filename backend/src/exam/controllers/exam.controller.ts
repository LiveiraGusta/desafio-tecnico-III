import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express'; 
import { ExamService } from '../services/exam.service';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { UpdateExamDto } from '../dtos/update-exam.dto';
import { QueryExamsDto } from '../dtos/query-exam.dto';

@Controller('exames')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  async create(@Body() createExamDto: CreateExamDto, @Res() res: Response) {
    const existingExam = await this.examService.findByIdempotencyKey(createExamDto.idempotencyKey);

    if (existingExam)
      return res.status(200).json(existingExam); 

    const newExam = await this.examService.create(createExamDto);
    return res.status(201).json(newExam);
  }


  @Get()
  findAll(@Query() query: QueryExamsDto) {
    return this.examService.findAll(query);
  }

}
