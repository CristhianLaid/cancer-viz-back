import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SampleService } from '../services/sample.service';
import { CreateSampleDto } from '../dto/create-sample.dto';
import { UpdateSampleDto } from '../dto/update-sample.dto';


@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get('country')
  findCountryAll() {
    return this.sampleService.findCountryAll();
  }

}
