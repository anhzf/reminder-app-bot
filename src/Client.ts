import {
  Client, ClientOptions, MessageContent, MessageSendOptions,
} from 'whatsapp-web.js';
import { sessionData } from './Auth.js';

class PoweredClient extends Client {
  sendMessage(chatId: string, content: MessageContent, options?: MessageSendOptions) {
    const timestamp = (new Date()).toLocaleString();
    const logMessage = `[${timestamp}]: message sent to ${String(chatId).bgWhite.black}`;

    console.log(logMessage);

    return super.sendMessage.call(this, chatId, content, options);
  }
}

const config: ClientOptions = {};
if (sessionData) config.session = sessionData;

export default new PoweredClient(config);
