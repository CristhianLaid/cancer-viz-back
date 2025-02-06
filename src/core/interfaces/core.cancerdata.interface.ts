import { ICoreBaseModel } from ".";

export interface ICoreCancerDataModelBase extends ICoreBaseModel{
    projectId:                string;
    cancerType:               string;
    dataSource:               string;
    accessionNo:              string;
    country:                  string;
    sampleId:                 string;
    sampleType:               string;
    constructionProtocol:     string;
    transcriptomeAnalysis:    string;
    metabolicProfile:         string;
};
  