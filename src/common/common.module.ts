import { Module } from '@nestjs/common';
import { CsvCommonService } from './csv/service/csv.common.service';
import { CsvFilterCommonService } from './csv/service/csv.filter.common.service';


@Module({
  controllers: [],
  providers: [CsvCommonService, CsvFilterCommonService],
  exports: [CsvCommonService, CsvFilterCommonService]
})
export class CommonModule {}
