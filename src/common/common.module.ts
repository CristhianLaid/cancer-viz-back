import { Module } from '@nestjs/common';
import { CsvCommonService } from './csv/service/csv.common.service';
import { FilterCommonService } from './filter/services/filter.common.service';
import { HandlerErrorService } from './error/handleError.service';


@Module({
  controllers: [],
  providers: [CsvCommonService, FilterCommonService, HandlerErrorService],
  exports: [CsvCommonService, FilterCommonService, HandlerErrorService]
})
export class CommonModule {}
