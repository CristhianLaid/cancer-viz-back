import { IFilterOptions } from '../interfaces/graph.filter.interface';

export class filterSampleDto implements IFilterOptions {
  accessionNo?:             string | undefined;
  cancerType?:              string | undefined;
  constructionProtocol?:    string | undefined;
  country?:                 string | undefined;
  dataSource?:              string | undefined;
  projectId?:               string | undefined;
  sampleId?:                string | undefined;
  sampleType?:              string | undefined;
};
