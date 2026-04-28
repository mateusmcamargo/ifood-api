import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

export const PATH_ROOT = path.resolve(__dirname, '../..');
export const PATH_SRC  = path.join(PATH_ROOT, 'src');
export const PATH_LOG  = path.join(PATH_ROOT, 'src', 'log');