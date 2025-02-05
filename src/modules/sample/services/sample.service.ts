import { Injectable } from '@nestjs/common';
import { CreateSampleDto } from '../dto/create-sample.dto';
import { UpdateSampleDto } from '../dto/update-sample.dto';



@Injectable()
export class SampleService {
  findAll() {
    return `This action returns all sample`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sample`;
  }

}
