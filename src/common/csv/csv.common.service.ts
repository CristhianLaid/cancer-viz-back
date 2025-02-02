import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { checkFileExists } from "./utils/csv.common.utils";
import { ICsvParserPlugin, readCsvFilePlugin } from "./plugin/csv.common.plugin";

@Injectable()
export class CsvCommonService{
    validateCsvFileExists(filePath: string) {
        return checkFileExists(filePath);
    };

    async getCsvFile(filePath: string): Promise<ICsvParserPlugin[]> {
        try {
            const data = await readCsvFilePlugin(filePath);
            return data;
        } catch (error) {
            throw new InternalServerErrorException(`Error in reading file CSV: ${error.message}`);
        };
    };
}