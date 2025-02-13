import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCancervizDto, UpdateCancervizDto } from "../dtos/create-sample.dto";
import { CancerType, Cancerviz, ConstructionProtocol, Country, SampleType } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class CancerVizCrudSampleService {
    constructor(
        @InjectRepository(Cancerviz)
        private readonly cancervizRepository: Repository<Cancerviz>,
    
        @InjectRepository(CancerType)
        private readonly cancerTypeRepo: Repository<CancerType>,
    
        @InjectRepository(DataSource)
        private readonly dataSourceRepo: Repository<DataSource>,
    
        @InjectRepository(SampleType)
        private readonly sampleTypeRepo: Repository<SampleType>,
    
        @InjectRepository(ConstructionProtocol)
        private readonly constructionProtocolRepo: Repository<ConstructionProtocol>,
    
        @InjectRepository(Country)
        private readonly countryRepo: Repository<Country>,
      ) {}
    
      async findOne(id: number): Promise<Cancerviz> {
        try {
          const record = await this.cancervizRepository.findOne({ where: { id } });
          if (!record) {
            throw new NotFoundException(`Record with ID ${id} not found`);
          }
          return record;
        } catch (error) {
          throw new NotFoundException(`Error while fetching record with ID ${id}: ${error.message}`);
        }
      }
    
      async create(createCancervizDto: CreateCancervizDto): Promise<Cancerviz> {
        try {
          await this.validateForeignKeys(createCancervizDto);
    
          const newRecord = this.cancervizRepository.create(createCancervizDto);
          return await this.cancervizRepository.save(newRecord);
        } catch (error) {
          throw new BadRequestException(`Error while creating record: ${error.message}`);
        }
      }
    
      async update(id: number, updateCancervizDto: UpdateCancervizDto): Promise<Cancerviz> {
        try {
          await this.findOne(id); // Ensuring the record exists
          await this.validateForeignKeys(updateCancervizDto);
    
          await this.cancervizRepository.update(id, updateCancervizDto);
          return await this.findOne(id); // Return updated record
        } catch (error) {
          throw new BadRequestException(`Error while updating record with ID ${id}: ${error.message}`);
        }
      }
    
      async delete(id: number): Promise<void> {
        try {
          const result = await this.cancervizRepository.delete(id);
          if (result.affected === 0) {
            throw new NotFoundException(`Record with ID ${id} not found`);
          }
        } catch (error) {
          throw new NotFoundException(`Error while deleting record with ID ${id}: ${error.message}`);
        }
      }
    
      private async validateForeignKeys(dto: CreateCancervizDto | UpdateCancervizDto) {
        try {
          const cancerType = await this.cancerTypeRepo.findOne({ where: { name: dto.cancerType } });
          if (!cancerType) {
            throw new BadRequestException(`Invalid cancerType: ${dto.cancerType}`);
          }
    
          const dataSource = await this.dataSourceRepo.findOne({ where: { name: dto.dataSource } });
          if (!dataSource) {
            throw new BadRequestException(`Invalid dataSource: ${dto.dataSource}`);
          }
    
          const sampleType = await this.sampleTypeRepo.findOne({ where: { name: dto.sampleType } });
          if (!sampleType) {
            throw new BadRequestException(`Invalid sampleType: ${dto.sampleType}`);
          }
    
          const constructionProtocol = await this.constructionProtocolRepo.findOne({ where: { name: dto.constructionProtocol } });
          if (!constructionProtocol) {
            throw new BadRequestException(`Invalid constructionProtocol: ${dto.constructionProtocol}`);
          }
    
          const country = await this.countryRepo.findOne({ where: { name: dto.country } });
          if (!country) {
            throw new BadRequestException(`Invalid country: ${dto.country}`);
          }
        } catch (error) {
          throw new BadRequestException(`Error while validating foreign keys: ${error.message}`);
        }
      }
}
