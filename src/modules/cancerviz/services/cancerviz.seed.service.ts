import { DataSource } from 'typeorm';

import { CsvCommonService } from 'src/common/csv/service';
import { Cancerviz } from '../entities';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class CancervizSeedService {
  private readonly logger = new Logger();

  constructor(
    private readonly csvCommonService: CsvCommonService,
    private readonly dataSource: DataSource,
  ) {}

  async seedCancervizDatabase(filePath: string) {
    try {
      if (!this.csvCommonService.validateCsvFileExists(filePath)) {
        throw new InternalServerErrorException('Error reading CSV file');
      }

      const csvData = await this.csvCommonService.getCsvFile(filePath);

      if (csvData.length === 0) {
        throw new BadRequestException(`No data in CSV file to insert`);
      }

      const queryBuilder = this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Cancerviz)
        .values(
          csvData.map((row) => ({
            projectId: row['Project ID'],
            cancerType: row['Cancer Type'],
            dataSource: row['Data Source'],
            accessionNo: row['Accession No.'],
            country: row['Country'],
            sampleId: row['Sample ID'],
            sampleType: row['Sample Type'],
            constructionProtocol: row['Construction Protocol'],
            transcriptomeAnalysis: row['Transcriptome Analysis'],
            metabolicProfile: row['Metabolic Profile'],
          })),
        );
      this.logger.log(
        '✅ Base de datos poblada con éxito usando Query Builder.',
      );
      await queryBuilder.execute();
    } catch (error) {
      this.logger.error('❌ Error al poblar la base de datos:', error);
      throw new InternalServerErrorException(error.detail);
    }
  }
}
