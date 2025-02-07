import { Module } from '@nestjs/common';
import { CsvCommonService } from './csv/service/csv.common.service';
import { FilterCommonService } from './filter/services/filter.common.service';


@Module({
  controllers: [],
  providers: [CsvCommonService, FilterCommonService],
  exports: [CsvCommonService, FilterCommonService]
})
export class CommonModule {}
