import qrcode from 'qrcode-terminal';
import { Message } from 'whatsapp-web.js';
import { setSession } from './src/Auth.js';
import client from './src/Client.js';
import command from './src/Commands.js';
import 'colors';

client.on('qr', (qr) => {
  console.log('QR Code received!'.bgCyan.black);
  qrcode.generate(qr, {
    small: true,
  });
});

client.on('authenticated', setSession);

client.on('ready', () => console.log('Whatsapp bot is Ready!'.bgGreen.black, '\n'));

client.on('message', (msg:Message) => command.listen(msg));

client.initialize();
