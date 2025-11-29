import { PartialType } from '@nestjs/mapped-types';
import { CreateExamDto } from './create-exam.dto';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { DicomModality } from '../../generated/prisma/enums';

export class UpdateExamDto extends PartialType(CreateExamDto) {
    @IsOptional()
    @IsEnum(DicomModality)
    dicomModality?: DicomModality;

    @IsOptional()
    @IsDateString()
    examDate?: string;
}
