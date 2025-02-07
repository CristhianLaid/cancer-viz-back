import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancerviz } from '../entities';
import { Repository } from 'typeorm/repository/Repository';
import { IFilterCommonCondition } from 'src/common/filter/interfaces/filter.common.interface';
import { FilterCommonService } from 'src/common/filter/services/filter.common.service';

@Injectable()
export class CancervizService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Cancerviz)
    private readonly cancervizRepository: Repository<Cancerviz>,
    private readonly csvFilterCommonService: FilterCommonService,
  ) {}

  async findAll(conditions: IFilterCommonCondition[]) {
    try {
      const data = await this.cancervizRepository.find();

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
      this.logger.error(error);
      throw new InternalServerErrorException(
        `${error ? error.message : 'Error reading CSV file'}`,
      );
    }
  }

  private _validateFilterConditions(conditions: IFilterCommonCondition[]) {
    const validFields = [
      'projectId',
      'cancerType',
      'dataSource',
      'accessionNo',
      'country',
      'sampleId',
      'sampleType',
      'constructionProtocol',
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
