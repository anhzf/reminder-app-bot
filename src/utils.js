import { readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export function __filename(importMetaUrl) {
    return fileURLToPath(importMetaUrl);
}

export function __dirname(importMetaUrl) {
    return dirname(__filename(importMetaUrl));
}

export function readJsonFile(path) {
    const file = readFileSync(path).toString();

    return JSON.parse(file);
}

export function generateChatId(phoneNumber) {
    return `${phoneNumber}@c.us`;
}