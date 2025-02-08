import { DataSource, Repository } from 'typeorm';

import { CancerType, Cancerviz, ConstructionProtocol, Country, SampleType } from '../entities';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CsvCommonService } from 'src/common/csv/service/csv.common.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CancervizSeedService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(CancerType)
    private cancerTypeRepo: Repository<CancerType>,

    @InjectRepository(DataSource)
    private dataSourceRepo: Repository<DataSource>,

    @InjectRepository(SampleType)
    private sampleTypeRepo: Repository<SampleType>,

    @InjectRepository(ConstructionProtocol)
    private constructionProtocolRepo: Repository<ConstructionProtocol>,

    @InjectRepository(Country)
    private countryRepo: Repository<Country>,
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
            age: row['age'],
            survivalMonths: row['survivalMonths'],
            tumorSize: row['tumorSize'],
            metastasisCount: row['metastasisCount'],
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
  };


  async saveUniqueValues(filePath: string) {
    if (!this.csvCommonService.validateCsvFileExists(filePath)) {
      throw new InternalServerErrorException('Error reading CSV file');
    }
  
    const csvData = await this.csvCommonService.getCsvFile(filePath);
  
    if (csvData.length === 0) {
      throw new BadRequestException(`No data in CSV file to insert`);
    }
  
    await this._saveUnique(csvData, "Cancer Type", this.cancerTypeRepo);
    await this._saveUnique(csvData, "Data Source", this.dataSourceRepo);
    await this._saveUnique(csvData, "Sample Type", this.sampleTypeRepo);
    await this._saveUnique(csvData, "Construction Protocol", this.constructionProtocolRepo);
    await this._saveUnique(csvData, "Country", this.countryRepo);
  }
  

  private async _saveUnique(csvData: any[], csvKey: string, repo: Repository<any>) {
    const uniqueValues = [
      ...new Set(csvData.map((item) => item[csvKey]?.trim()).filter((v) => v)),
    ];
  
    for (const value of uniqueValues) {
      const exists = await repo.findOne({ where: { name: value } });
      if (!exists) {
        await repo.save({ name: value });
      }
    }
  }
  

  
}
