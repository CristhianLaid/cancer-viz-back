import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateSampleDto } from '../dto/create-sample.dto';
import { UpdateSampleDto } from '../dto/update-sample.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/modules/cancerviz/entities';
import { Repository } from 'typeorm';



@Injectable()
export class SampleService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ){}
  async findCountryAll() {
    try {
      const country = await this.countryRepository.find();
      return {...country}
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }


}
