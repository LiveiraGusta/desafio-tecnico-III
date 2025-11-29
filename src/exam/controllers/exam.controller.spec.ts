import { Test, TestingModule } from '@nestjs/testing';
import { ExamController } from './exam.controller';
import { ExamService } from '../services/exam.service';

describe('ExamController', () => {
  let controller: ExamController;

  const examServiceMock = {
    create: jest.fn(),
    findByIdempotencyKey: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamController],
      providers: [
        { provide: ExamService, useValue: examServiceMock }
      ],
    }).compile();

    controller = module.get<ExamController>(ExamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
