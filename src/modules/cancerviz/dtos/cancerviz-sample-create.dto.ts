import { ICancerDataModelBase } from "../interfaces/cancerviz.interface";

export class CancervizViewDto implements ICancerDataModelBase{
    id: number;
    projectId: string;
    cancerType: string;
    dataSource: string;
    accessionNo: string;
    country: string;
    sampleId: string;
    sampleType: string;
    constructionProtocol: string;
    age: string;
    survivalMonths: string;
    tumorSize: string;
    metastasisCount: string;
    transcriptomeAnalysis: string;
    metabolicProfile: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(item: Record<string, any>) {
      this.id = item.id;
      this.projectId = item.projectId;
      this.cancerType = item.cancerType;
      this.dataSource = item.dataSource;
      this.accessionNo = item.accessionNo;
      this.country = item.country;
      this.sampleId = item.sampleId;
      this.sampleType = item.sampleType;
      this.constructionProtocol = item.constructionProtocol;
      this.age = item.age;
      this.survivalMonths = item.survivalMonths;
      this.tumorSize = item.tumorSize;
      this.metastasisCount = item.metastasisCount;
      this.transcriptomeAnalysis = item.transcriptomeAnalysis;
      this.metabolicProfile = item.metabolicProfile;
      this.createdAt = item.createdAt;
      this.updatedAt = item.updatedAt;
    }
  }
  