import { IsString, IsNotEmpty, IsUUID, IsEnum, IsDateString } from 'class-validator';
import { DicomModality } from 'src/generated/prisma/enums';

export class CreateExamDto{
    @IsUUID()
    @IsNotEmpty({ message: 'Patient ID is required' })
    patientId: string;

    @IsEnum(DicomModality, { message: 'Dicom modality must be a valid enum value' })
    dicomModality: DicomModality;

    @IsDateString({}, { message: 'Exam date must be a valid ISO date string' })
    examDate: string;

    @IsString()
    @IsNotEmpty({ message: 'Idempotency key is required' })
    idempotencyKey: string;
}
