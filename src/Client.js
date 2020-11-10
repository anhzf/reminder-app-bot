import { Client } from 'whatsapp-web.js';
import { sessionData } from './Auth.js';

export default new Client({
    session: sessionData
});