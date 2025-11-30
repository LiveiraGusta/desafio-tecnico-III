import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, Res } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { CreatePatientDto } from '../dtos/create-patient.dto';
import { UpdatePatientDto } from '../dtos/update-patient.dto';
import { QueryPatientsDto } from '../dtos/query-patient.dto';
import { Response } from 'express';

@Controller('pacientes')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }


  @Get()
  findAll(@Query() query: QueryPatientsDto ) {
    return this.patientService.findAll(query);
  }

  @Get(':document')
  async findOneByDocument(@Param('document') document: string, @Res() res: Response) {
    const patient = await this.patientService.findByDocument(document);

    if(!patient?.id)
      return res.status(400).json(); 

    return res.status(200).json(patient); ;
  }


}
