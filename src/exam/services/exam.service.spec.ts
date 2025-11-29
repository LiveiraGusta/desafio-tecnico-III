import { Test, TestingModule } from '@nestjs/testing';
import { ExamService } from './exam.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { PatientService } from '../../patient/services/patient.service';

describe('ExamService', () => {
  let service: ExamService;

  const prismaMock = {
    exam: {
      create: jest.fn(),
      findUnique: jest.fn()
    }
  };

  const patientMock = {
    findByDocument: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: PatientService, useValue: patientMock }
      ],
    }).compile();

    service = module.get<ExamService>(ExamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
