import { Controller, Get, Param, Query  } from '@nestjs/common';
import { GraphService } from '../services/graph.service';
import { convertQueryParamsToConditions } from 'src/common/filter/utils/filter.common.utils';

@Controller('graph')
export class GraphController {
  constructor(
    private readonly graphService: GraphService
  ) {}

  @Get("read/:filename")
  async readCSV(
    @Param("filename") filename: string,
    @Query() query: Record<string, string>
  ) {
    const filePath = `src/data/${filename}-Browse-Table.csv`;

    const conditions = convertQueryParamsToConditions({query});

    return await this.graphService.getGraphs(filePath, conditions)
  };
};
