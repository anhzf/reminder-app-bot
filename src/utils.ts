import { readFileSync, PathLike } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
export function __filename(importMetaUrl: string) {
  return fileURLToPath(importMetaUrl);
}

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
export function __dirname(importMetaUrl: string) {
  return dirname(__filename(importMetaUrl));
}

export function readJsonFile<T>(path: PathLike): T {
  const file = readFileSync(path).toString();

  return JSON.parse(file);
}

export function generateChatId(phoneNumber: string) {
  return `${phoneNumber}@c.us`;
}
