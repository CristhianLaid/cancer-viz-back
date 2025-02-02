import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ICsvFilterCommonCondition } from 'src/common/csv/interfaces/csv.filter.common.interface';
import { CsvFilterCommonService } from 'src/common/csv/service';
import { CsvCommonService } from 'src/common/csv/service/csv.common.service';

@Injectable()
export class GraphService {
  constructor(
    private readonly csvCommonService: CsvCommonService,
    private readonly csvFilterCommonService: CsvFilterCommonService,
  ) {}

  async getGraphs(filePath: string, conditions: ICsvFilterCommonCondition[]) {
    try {
      if (!this.csvCommonService.validateCsvFileExists(filePath)) {
        throw new InternalServerErrorException('Error reading CSV file');
      }

      const data = await this.csvCommonService.getCsvFile(filePath);

      this._validateFilterConditions(conditions);

      if (conditions.length > 0) {
        const filteredData = this.csvFilterCommonService.applyFilters(
          data,
          conditions,
        );

        return filteredData;
      }

      return data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `${error ? error.message : 'Error reading CSV file'}`,
      );
    }
  }

  //   private _filteredGraphs(filteredData) {

  //   }

  private _validateFilterConditions(
    conditions: ICsvFilterCommonCondition[],
  ){
    const validFields = [
      'Project ID',
      'Cancer Type',
      'Data Source',
      'Accession No.',
      'Country',
      'Sample ID',
      'Sample Type',
      'Construction Protocol',
    ];
    conditions.forEach((condition) => {
      if (!validFields.includes(condition.field)) {
        throw new BadRequestException(
          `Invalid filter field: ${condition.field}. Valid fields are: ${validFields.join(', ')}`,
        );
      }
    });
  }
}
