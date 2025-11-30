import { IsString, IsNotEmpty, IsUUID, IsEnum, IsDateString } from 'class-validator';
import { DicomModality } from '../../generated/prisma/enums';

export class CreateExamDto{
    @IsString()
    @IsNotEmpty({ message: 'Patient CPF is required' })
    patientDocument: string;

    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Responsible Doctor is required' })
    responsibleDoctor: string;

    @IsEnum(DicomModality, { message: 'Dicom modality must be a valid enum value' })
    dicomModality: DicomModality;

    @IsDateString({}, { message: 'Exam date must be a valid ISO date string' })
    examDate: string;

    @IsString()
    @IsNotEmpty({ message: 'Idempotency key is required' })
    idempotencyKey: string;
}
