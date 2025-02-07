import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { CancervizService } from '../services';
import { convertQueryParamsToConditions } from 'src/common/filter/utils/filter.common.utils';

@Controller('cancerviz')
export class CancervizController {
  constructor(private readonly cancervizService: CancervizService) {}

  @Get()
  findAll(
    @Query() query: Record<string, string>
  ) {
    const conditions = convertQueryParamsToConditions({query});
    return this.cancervizService.findAll(conditions);
  }
}
