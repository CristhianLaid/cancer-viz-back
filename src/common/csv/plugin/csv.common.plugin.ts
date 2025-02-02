import * as path from 'path';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { checkFileExists, cleanString } from '../utils/csv.common.utils';

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
        // Limpiar las claves de cada fila (row) y los valores
        const cleanedRow = Object.fromEntries(
          Object.entries(row)
          .map(([key, value]) => [
            cleanString(key),
            cleanString(String(value)),
          ])
        );
        result.push(cleanedRow); // Añadir la fila limpia
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
