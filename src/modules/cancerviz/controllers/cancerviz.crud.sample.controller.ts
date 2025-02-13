import { Body, Controller, Delete, Get, Param, Patch, Post,  UsePipes } from '@nestjs/common';
import { CreateCancervizDto, UpdateCancervizDto } from '../dtos/create-sample.dto';
import { Cancerviz } from '../entities';
import { CancerVizCrudSampleService } from '../services/cancerviz.crud.sample.service';

@Controller('cancerviz')
@UsePipes()
export class CancerVizCrudSampleController {
  constructor(
    private readonly cancerVizCrudSampleService: CancerVizCrudSampleService,
  ) {}


  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cancerviz> {
    return this.cancerVizCrudSampleService.findOne(id);
  }

  @Post()
  async create(@Body() createCancervizDto: CreateCancervizDto): Promise<Cancerviz> {
    return this.cancerVizCrudSampleService.create(createCancervizDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCancervizDto: UpdateCancervizDto,
  ): Promise<Cancerviz> {
    return this.cancerVizCrudSampleService.update(id, updateCancervizDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.cancerVizCrudSampleService.delete(id);
  }
}
