import { Injectable } from '@nestjs/common';
import { CreateCancervizDto, UpdateCancervizDto } from '../dto';

@Injectable()
export class CancervizService {
  create(createCancervizDto: CreateCancervizDto) {
    return 'This action adds a new cancerviz';
  }

  findAll() {
    return `This action returns all cancerviz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cancerviz`;
  }

  update(id: number, updateCancervizDto: UpdateCancervizDto) {
    return `This action updates a #${id} cancerviz`;
  }

  remove(id: number) {
    return `This action removes a #${id} cancerviz`;
  }
}
