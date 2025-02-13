import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { ICancerDataModelBase } from '../interfaces/cancerviz.interface';

export class CreateCancervizDto implements ICancerDataModelBase {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    @IsString()
    projectId: string;
  
    @IsString()
    cancerType: string;
  
    @IsString()
    dataSource: string;
  
    @IsString()
    accessionNo: string;
  
    @IsString()
    country: string;
  
    @IsString()
    sampleId: string;
  
    @IsString()
    sampleType: string;
  
    @IsString()
    constructionProtocol: string;
  
    @IsString()
    age: string;
  
    @IsString()
    survivalMonths: string;
  
    @IsString()
    tumorSize: string;
  
    @IsString()
    metastasisCount: string;
  
    @IsString()
    transcriptomeAnalysis: string;
  
    @IsString()
    metabolicProfile: string;
}

export class UpdateCancervizDto extends PartialType(CreateCancervizDto){}