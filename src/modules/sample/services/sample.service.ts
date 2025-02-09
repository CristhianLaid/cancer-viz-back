import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CancerType, DataSource, SampleType, ConstructionProtocol, Country } from 'src/modules/cancerviz/entities';

@Injectable()
export class SampleService {
  private readonly logger = new Logger(SampleService.name);

  constructor(
    @InjectRepository(CancerType)
    private readonly cancerTypeRepo: Repository<CancerType>,

    @InjectRepository(DataSource)
    private readonly dataSourceRepo: Repository<DataSource>,

    @InjectRepository(SampleType)
    private readonly sampleTypeRepo: Repository<SampleType>,

    @InjectRepository(ConstructionProtocol)
    private readonly constructionProtocolRepo: Repository<ConstructionProtocol>,

    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
  ) {}

  async findSampleCountryAll() {
    try {
      return await this.countryRepo.find();
    } catch (error) {
      this.logger.error('Error fetching countries', error.stack);
      throw new InternalServerErrorException('Could not fetch countries');
    }
  }

  async findAllCancerTypes() {
    try {
      return await this.cancerTypeRepo.find();
    } catch (error) {
      this.logger.error('Error fetching cancer types', error.stack);
      throw new InternalServerErrorException('Could not fetch cancer types');
    }
  }

  async findAllDataSources() {
    try {
      return await this.dataSourceRepo.find();
    } catch (error) {
      this.logger.error('Error fetching data sources', error.stack);
      throw new InternalServerErrorException('Could not fetch data sources');
    }
  }

  async findAllSampleTypes() {
    try {
      return await this.sampleTypeRepo.find();
    } catch (error) {
      this.logger.error('Error fetching sample types', error.stack);
      throw new InternalServerErrorException('Could not fetch sample types');
    }
  }

  async findAllConstructionProtocols() {
    try {
      return await this.constructionProtocolRepo.find();
    } catch (error) {
      this.logger.error('Error fetching construction protocols', error.stack);
      throw new InternalServerErrorException('Could not fetch construction protocols');
    }
  }
}

