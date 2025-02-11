import { Controller, Get, InternalServerErrorException, Param, Query } from '@nestjs/common';
import { GraphService } from '../services/graph.service';
import { convertQueryParamsToConditions } from 'src/common/filter/utils/filter.common.utils';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  // @Get('read/:filename')
  // async readCSV(
  //   @Param('filename') filename: string,
  //   @Query() query: Record<string, string>,
  // ) {
  //   const filePath = `src/data/${filename}-Browse-Table.csv`;

  //   const conditions = convertQueryParamsToConditions({ query });

  //   return await this.graphService.getCsvGraphs(filePath, conditions);
  // }


   @Get()
    findAll(
      @Query() query: Record<string, string>,
    ) {
      const conditions = convertQueryParamsToConditions({ query });
      return this.graphService.findAll({conditions});
    }

  @Get('countries')
  async findAllCancerTypes() {
    try {
      return await this.graphService.findGraphCountryAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch country');
    }
  }

  @Get('data-sources')
  async findAllDataSources() {
    try {
      return await this.graphService.findGraphAllDataSources();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch data sources');
    }
  }
}
