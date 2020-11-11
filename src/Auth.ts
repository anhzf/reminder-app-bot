import { existsSync, writeFile } from 'fs';
import { resolve } from 'path';
import { readJsonFile, __dirname } from './utils.js';
import { ClientSession } from 'whatsapp-web.js';
import 'colors';

const sessionFileUrl = resolve(__dirname(import.meta.url), '../session.json');

function getSession<T>() {
    console.log('Checking session...'.blue);

    return existsSync(sessionFileUrl) ?
        readJsonFile<T>(sessionFileUrl) : null;
}

export const sessionData = getSession<ClientSession>();

export function setSession(data: ClientSession) {
    console.log('Updating session...'.yellow);
    writeFile(sessionFileUrl, JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('Session updated!'.blue);
    });
}