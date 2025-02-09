import {
  Controller,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { SampleService } from '../services/sample.service';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get('countries')
  async findSampleCountryAll() {
    try {
      return await this.sampleService.findSampleCountryAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch countries');
    }
  }

  @Get('cancer-types')
  async findAllCancerTypes() {
    try {
      return await this.sampleService.findAllCancerTypes();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch cancer types');
    }
  }

  @Get('data-sources')
  async findAllDataSources() {
    try {
      return await this.sampleService.findAllDataSources();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch data sources');
    }
  }

  @Get('sample-types')
  async findAllSampleTypes() {
    try {
      return await this.sampleService.findAllSampleTypes();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch sample types');
    }
  }

  @Get('construction-protocols')
  async findAllConstructionProtocols() {
    try {
      return await this.sampleService.findAllConstructionProtocols();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch construction protocols');
    }
  }
}
