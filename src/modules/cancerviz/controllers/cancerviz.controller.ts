import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { CancervizService } from '../services';
import { convertQueryParamsToConditions } from 'src/common/filter/utils/filter.common.utils';
import { CommonPaginationDto } from 'src/common/paginate/dtos/paginate-sample.dto';

@Controller('cancerviz')
@UsePipes()
export class CancervizController {
  constructor(private readonly cancervizService: CancervizService) {}

  @Get()
  findAll(
    @Query() query: Record<string, string>,
  ) {
    const { limit, offset, ...filterQuery } = query;
    const pagination: CommonPaginationDto = {
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    };
    const conditions = convertQueryParamsToConditions({ query:filterQuery });
    return this.cancervizService.findAll({conditions, paginationDto:pagination});
  }
}
