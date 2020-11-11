import qrcode from 'qrcode-terminal';
import { setSession } from './src/Auth.js';
import client from './src/Client.js';
// import scheduled from 'node-schedule';
import 'colors';

client.on('qr', (qr) => {
  console.log('QR Code received!'.bgCyan.black);
  qrcode.generate(qr, {
    small: true,
  });
});

client.on('authenticated', setSession);

client.on('ready', () => console.log('Whatsapp bot is Ready!'.bgGreen.black, '\n'));

// client.on('message', onMessage);

client.initialize();
