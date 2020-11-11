import {
  Client, ClientOptions, MessageContent, MessageSendOptions,
} from 'whatsapp-web.js';
import { sessionData } from './Auth.js';

class PoweredClient extends Client {
  sendMessage(chatId: string, content: MessageContent, options?: MessageSendOptions) {
    const tt = new Date();

    console.log(`[${tt.toLocaleString()}]: message sent to ${String(chatId).bgYellow.black}`);

    return super.sendMessage.call(this, chatId, content, options);
  }
}

const config: ClientOptions = {};
if (sessionData) config.session = sessionData;

export default new PoweredClient(config);
