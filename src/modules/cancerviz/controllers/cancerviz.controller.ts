import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCancervizDto, UpdateCancervizDto } from '../dto';
import { CancervizService } from '../services';


@Controller('cancerviz')
export class CancervizController {
  constructor(private readonly cancervizService: CancervizService) {}

  @Post()
  create(@Body() createCancervizDto: CreateCancervizDto) {
    return this.cancervizService.create(createCancervizDto);
  }

  @Get()
  findAll() {
    return this.cancervizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cancervizService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCancervizDto: UpdateCancervizDto) {
    return this.cancervizService.update(+id, updateCancervizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cancervizService.remove(+id);
  }
}
