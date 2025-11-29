import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from '../dtos/create-patient.dto';
import { QueryPatientsDto } from '../dtos/query-patient.dto';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Patient } from '../../generated/prisma/client';

@Injectable()
export class PatientService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    const existingPatient = await this.findByDocument(createPatientDto.document);
    if (existingPatient)
      throw new ConflictException('This CPF is already linked to a patient.');

    return this.prismaService.patient.create({ data: createPatientDto });
  }

  async findAll(query: QueryPatientsDto) {
    const { page = 1, pageSize = 10, search, name, document } = query;
    const skip = (page - 1) * pageSize;
    
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { document: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (name)
      where.name = { contains: name, mode: 'insensitive' };
    
    if (document)
      where.document = { equals: document };

    const [patients, total] = await this.prismaService.$transaction([
      this.prismaService.patient.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: { name: 'asc' },
      }),
      this.prismaService.patient.count({ where }),
    ]);

    return {
      data: patients,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      total: total,
    };
  }

  public async findByDocument(document: string): Promise<Patient | null> {
    return this.prismaService.patient.findUnique({ where: { document } });
  }

}
