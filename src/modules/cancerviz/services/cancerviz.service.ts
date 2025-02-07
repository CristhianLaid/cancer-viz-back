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
import { CommonPaginationDto } from 'src/common/paginate/dtos/paginate-sample.dto';
import { CancervizViewDto } from '../dtos/cancerviz-sample-create.dto';

@Injectable()
export class CancervizService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Cancerviz)
    private readonly cancervizRepository: Repository<Cancerviz>,
    private readonly csvFilterCommonService: FilterCommonService,
  ) {}

  async findAll({
    conditions,
    paginationDto,
  }: {
    conditions: IFilterCommonCondition[];
    paginationDto: CommonPaginationDto;
  }) {
    try {
      let data = await this.cancervizRepository.find();

      this._validateFilterConditions(conditions);
      data = this._applyFilters(data, conditions);
      return this._paginateData(data, paginationDto);
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

  private _paginateData(
    data: CancervizViewDto[],
    paginationDto: CommonPaginationDto,
  ) {
    const { limit, offset } = paginationDto;


    if (limit === undefined && offset === undefined) {
      return { data, total: data.length };
    }

    const limitValue = limit ?? 20;
    const offsetValue = offset ?? 0;
    const paginatedData = data.slice(offsetValue, offsetValue + limitValue);

    return {
      data: paginatedData,
      total: data.length,
      limit: limitValue,
      offset: offsetValue,
    };
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
