import qrcode from 'qrcode-terminal';
import { Message } from 'whatsapp-web.js';
import { setSession } from './src/Auth.js';
import client from './src/Client.js';
import command from './src/Commands/index.js';
import 'colors';

client.on('qr', (qr) => {
  console.log('QR Code received!'.bgCyan.black);
  qrcode.generate(qr, {
    small: true,
  });
});

client.on('authenticated', setSession);

client.on('ready', () => {
  console.log('Whatsapp bot is Ready!'.green, '\n');
  command.listingCommand();
});

client.on('message', (msg:Message) => command.listen(msg));

client.on('disconnected', () => console.log('Disconnected from phone, please check your phone...'.bgRed.white));

client.initialize();
