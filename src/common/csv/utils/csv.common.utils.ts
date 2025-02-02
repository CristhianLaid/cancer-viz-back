import * as path from "path"
import * as fs from "fs"

export const checkFileExists = (filePath: string): boolean => {
    const fullPath = path.resolve(filePath);
    return fs.existsSync(fullPath);
};