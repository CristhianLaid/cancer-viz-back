import { Injectable } from '@nestjs/common';
import { ICsvFilterCommonCondition } from '../interfaces/csv.filter.common.interface';

@Injectable()
export class CsvFilterCommonService {
  applyFilters(
    data: Record<string, any>[],
    conditions: ICsvFilterCommonCondition[],
  ) {
    if (!conditions || conditions.length === 0) return data;

    const addConditionsAnd = conditions.filter(
      (condition) => condition.operator === 'AND',
    );
    const addConditionsOr = conditions.filter(
      (condition) => condition.operator === 'OR',
    );

    let filteredData = data.filter((row) =>
      addConditionsAnd.every((cond) => this.matchesCondition(row, cond)),
    );

    if (addConditionsOr.length > 0) {
      const orFilteredData = data.filter((row) =>
        addConditionsOr.some((cond) => this.matchesCondition(row, cond)),
      );
      filteredData = [...new Set([...filteredData, ...orFilteredData])];
    }

    return filteredData;
  }

  private matchesCondition(
    row: Record<string, any>,
    condition: ICsvFilterCommonCondition,
  ): boolean {
    const fieldValue = (row[condition.field]).toString().trim().toLowerCase();
    const filterValue = condition.value.toString().trim().toLowerCase();
    return fieldValue === filterValue;
  }
}
