import fs from 'fs';
import { PATH_LOG } from '../config/paths.js';

const LOG_FILE = `${PATH_LOG}/errors.log`;

export function errorLog(error, context = '') {
    const time  = new Date().toISOString();
    const entry = `[${time}] [${context}] ${error}\n`;

    if (!fs.existsSync(PATH_LOG)) {
        fs.mkdirSync(PATH_LOG, {
            recursive: true
        });
    }

    fs.appendFileSync(LOG_FILE, entry, 'utf-8');
    console.error(entry);
}