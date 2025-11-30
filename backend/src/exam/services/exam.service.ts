import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { UpdateExamDto } from '../dtos/update-exam.dto';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { QueryExamsDto } from '../dtos/query-exam.dto';
import { PatientService } from '../../patient/services/patient.service';

@Injectable()
export class ExamService {
  constructor(private readonly prismaService: PrismaService, private readonly patientService: PatientService) {}
  
  async findAll(query: QueryExamsDto) {
    const { page = 1, pageSize = 10, search, patientDocument, dicomModality, examDate } = query;
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (search) {
      where.OR = [
        { id: { contains: search } },
        { idempotencyKey: { contains: search } },
        { patient: { name: { contains: search, mode: 'insensitive' } } },
        { patient: { document: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (dicomModality)
      where.dicomModality = dicomModality;

    if (examDate)
      where.examDate = new Date(examDate);

    const [exams, total] = await this.prismaService.$transaction([
      this.prismaService.exam.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: { examDate: 'desc' },
        include: { patient: true },
      }),
      this.prismaService.exam.count({ where }),
    ]);

    return {
      data: exams,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      total,
    };
  }

  async findByIdempotencyKey(key: string) {
    return this.prismaService.exam.findUnique({ where: { idempotencyKey: key } });
  }

  async create(createExamDto: CreateExamDto) {
    const patient = await this.patientService.findByDocument(createExamDto.patientDocument);
    if (!patient)
      throw new NotFoundException('Patient not found');

    return this.prismaService.exam.create({
      data: {
        patientId: patient.id,
        dicomModality: createExamDto.dicomModality,
        examDate: createExamDto.examDate,
        idempotencyKey: createExamDto.idempotencyKey,
      },
    });
  }   

}
