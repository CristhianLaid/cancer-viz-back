import * as path from 'path';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { checkFileExists } from '../utils/csv.common.utils';

export interface ICsvParserPlugin {
  [key: string]: string;
}

export const readCsvFilePlugin = (
  filePath: string,
): Promise<ICsvParserPlugin[]> => {
  return new Promise((resolve, rejects) => {
    const result: ICsvParserPlugin[] = [];
    const fullPath = path.resolve(filePath);

    if (!checkFileExists(fullPath)) {
      rejects({
        statusCode: 404,
        message: `The file ${filePath} not exists.`,
        error: 'Not Found',
      });
      return;
    }

    fs.createReadStream(fullPath)
      .pipe(csvParser())
      .on('data', (row) => {
        result.push(row);
      })
      .on('end', () => resolve(result))
      .on('error', (error) =>
      rejects({
        statusCode: 500,
        message: `Error in reading file CSV: ${error.message}`,
        error: 'Internal Server Error',
      })
      );
  });
};
