import { IsOptional, IsUUID, IsEnum, IsString, IsDateString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { DicomModality } from 'src/generated/prisma/enums';

export class QueryExamsDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    pageSize?: number = 10;

    @IsOptional()
    @IsString()
    patientDocument?: string;

    @IsOptional()
    @IsEnum(DicomModality)
    dicomModality?: DicomModality;

    @IsOptional()
    @IsDateString()
    examDate?: string;

    @IsOptional()
    @IsString()
    search?: string;
}
