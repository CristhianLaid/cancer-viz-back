import * as path from 'path';
import * as fs from 'fs';

export const checkFileExists = (filePath: string): boolean => {
  const fullPath = path.resolve(filePath);
  return fs.existsSync(fullPath);
};

// Función para limpiar el BOM y los espacios extra
export const cleanString = (str: string): string => {
  // Eliminar BOM (U+FEFF) y otros caracteres invisibles
  return str.replace(/^\uFEFF/, '').trim();
};
