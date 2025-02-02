export interface IFilterOptions {
  country?: string; // Filtrar por país (por ejemplo, 'USA', 'UK')
  sampleType?: string; // Filtrar por tipo de muestra (por ejemplo, 'Tumour', 'Normal')
  cancerType?: string; // Filtrar por tipo de cáncer (por ejemplo, 'Merkel Cell Carcinoma')
  constructionProtocol?: string; // Filtrar por protocolo de construcción (por ejemplo, '10X Genomics')
  dataSource?: string; // Filtrar por fuente de datos (por ejemplo, 'NCBI (GEO)', 'TCGA')
  accessionNo?: string; // Filtrar por número de acceso (por ejemplo, 'GSE117988')
  projectId?: string; // Filtrar por projectId (por ejemplo, 'MCC-001', 'MCC-002')
  sampleId?: string; // Filtrar por sampleId (por ejemplo, 'MCC-001-01-1A', 'MCC-001-02-1B')
};
