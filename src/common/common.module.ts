import { Module } from '@nestjs/common';
import { CsvCommonService } from './csv/csv.common.service';

@Module({
  controllers: [],
  providers: [CsvCommonService],
  exports: [CsvCommonService]
})
export class CommonModule {}
