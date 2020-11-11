import { Client } from 'whatsapp-web.js';
import { sessionData } from './Auth.js';

class PoweredClient extends Client {
    sendMessage() {
        const [chatId] = arguments;
        const tt = new Date;
    
        console.log(`[${tt.toLocaleString()}]: message sent to ${String(chatId).bgYellow.black}`);

        return super.sendMessage.apply(this, arguments);
    }
};


export default new PoweredClient({
   session: sessionData
});