import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CsvCommonService } from 'src/common/csv/service/csv.common.service';
import { IFilterCommonCondition } from 'src/common/filter/interfaces/filter.common.interface';
import { FilterCommonService } from 'src/common/filter/services/filter.common.service';
import { CancervizViewDto } from 'src/modules/cancerviz/dtos/cancerviz-sample-create.dto';
import { Cancerviz, Country, DataSource } from 'src/modules/cancerviz/entities';

@Injectable()
export class GraphService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(DataSource)
    private readonly dataSourceRepo: Repository<DataSource>,
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
    @InjectRepository(Cancerviz)
    private readonly cancervizRepository: Repository<Cancerviz>,
    private readonly csvCommonService: CsvCommonService,
    private readonly csvFilterCommonService: FilterCommonService,
  ) {}

  // async getCsvGraphs(filePath: string, conditions: IFilterCommonCondition[]) {
  //   try {
  //     if (!this.csvCommonService.validateCsvFileExists(filePath)) {
  //       throw new InternalServerErrorException('Error reading CSV file');
  //     }

  //     const data = await this.csvCommonService.getCsvFile(filePath);

  //     this._validateFilterConditions(conditions);

  //     if (conditions.length > 0) {
  //       const filteredData = this.csvFilterCommonService.applyFilters(
  //         data,
  //         conditions,
  //       );

  //       return filteredData;
  //     }

  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //     throw new InternalServerErrorException(
  //       `${error ? error.message : 'Error reading CSV file'}`,
  //     );
  //   }
  // }

  async findGraphCountryAll() {
    try {
      return await this.countryRepo.find();
    } catch (error) {
      this.logger.error('Error fetching countries', error.stack);
      throw new InternalServerErrorException('Could not fetch countries');
    }
  }

  async findGraphAllDataSources() {
    try {
      return await this.dataSourceRepo.find();
    } catch (error) {
      this.logger.error('Error fetching data sources', error.stack);
      throw new InternalServerErrorException('Could not fetch data sources');
    }
  }

  async findAll({
      conditions,
    }: {
      conditions: IFilterCommonCondition[];
    }) {
      try {
        let data = await this.cancervizRepository.find();
        console.log(data)
        this._validateFilterConditions(conditions);
        data = this._applyFilters(data, conditions);
        return data
      } catch (error) {
        this.logger.error(error);
        throw new InternalServerErrorException(
          `${error?.message || 'Error retrieving cancer data'}`,
        );
      }
    }
    
    
  private _applyFilters(
      data: Cancerviz[],
      conditions: IFilterCommonCondition[],
    ): CancervizViewDto[] {
      if (conditions.length > 0) {
        return this.csvFilterCommonService
          .applyFilters(data, conditions)
          .map((item) => new CancervizViewDto(item));
      }
      return data.map((item) => new CancervizViewDto(item));
    }

  private _validateFilterConditions(conditions: IFilterCommonCondition[]) {
    const validFields = [
      'dataSource',
      'country',
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
