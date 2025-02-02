import { IGraphCancerData } from '../interfaces/graph.interface';

export class Graph implements IGraphCancerData {
  projectId: string;
  cancerType: string;
  dataSource: string;
  accessionNo: string;
  country: string;
  sampleId: string;
  sampleType: string;
  constructionProtocol: string;
  transcriptomeAnalysis: string;
  metabolicProfile: string;
};
