import { IsString, IsNotEmpty, IsDateString, Length, IsEmail } from 'class-validator';
import { Patient } from 'src/generated/prisma/client';

export class CreatePatientDto implements Partial<Patient>{
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsEmail()
    email: string

    @IsString()
    phone: string

    @IsString()
    @IsNotEmpty({ message: 'Document is required' })
    @Length(11, 11, { message: 'Doocument must have 11 characters' })
    document: string;
}
