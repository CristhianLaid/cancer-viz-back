import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';

import { CsvCommonService } from 'src/common/csv/csv.common.service';
import { GraphService } from '../services/graph.service';


@Controller('graph')
export class GraphController {
  constructor(
    private readonly graphService: GraphService,
    private readonly csvCommonService: CsvCommonService
  ) {}

  @Get("read/:filename")
  async readCSV(@Param("filename") filename: string) {
    const filePath = `src/data/${filename}-Browse-Table.csv`
    try {
      if ( !this.csvCommonService.validateCsvFileExists(filePath) ) {
        throw new InternalServerErrorException("Error reading CSV file");
      }
      return this.csvCommonService.getCsvFile(filePath);
    } catch (error) {
      throw new InternalServerErrorException("Error reading CSV file");
    };
  };
};
