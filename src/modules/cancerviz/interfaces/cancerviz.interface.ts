import { ICoreBaseModel } from "src/core/interfaces";

export interface ICancerDataModelBase extends ICoreBaseModel{
    projectId:                string;
    cancerType:               string;
    dataSource:               string;
    accessionNo:              string;
    country:                  string;
    sampleId:                 string;
    sampleType:               string;
    constructionProtocol:     string;
    age:                      string;
    survivalMonths:           string;
    tumorSize:                string;
    metastasisCount:          string;
    transcriptomeAnalysis:    string;
    metabolicProfile:         string;
};