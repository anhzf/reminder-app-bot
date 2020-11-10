import { existsSync, writeFile } from 'fs';
import { resolve } from 'path';
import { readJsonFile, __dirname } from './utils.js';
import 'colors';

const sessionFileUrl = resolve(__dirname(import.meta.url), '../session.json');

function getSession() {
    console.log('Checking session...'.bgCyan.black);

    return existsSync(sessionFileUrl) ?
        readJsonFile(sessionFileUrl) : null;
}


export const sessionData = getSession();

export function setSession(data) {
    console.log('Updating session...'.bgCyan.black);
    writeFile(sessionFileUrl, JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('Session updated!'.bgGreen.black);
    });
}