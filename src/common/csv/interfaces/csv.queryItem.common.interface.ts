export interface IQueryItemCommon {
  operator: 'AND' | 'OR';
  [key: string]: string;
}
