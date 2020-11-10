import qrcode, { error } from 'qrcode-terminal';
import { setSession } from './src/Auth.js';
import client from './src/Client.js';
import {  } from 'whatsapp-web.js';
import 'colors';

client.on('qr', qr => {
    console.log('QR Code received!'.bgCyan.black);
    qrcode.generate(qr, {
        small: true,
    });
});

client.on('authenticated', setSession);

client.on('ready', async _ => {
    console.log('Whatsapp bot is Ready!'.bgCyan.black);

    const contacts = await client.getContacts();
    const filtered = contacts.filter(({ name }) => [
        'Mas Darril Murobbi',
        'Adib Liqo\'',
        'Arvino Liqo\'',
        'Haudli Liqo\'',
        'Hamid Yahya',
        'Zain Bidin',
        'MyTelkom',
    ].includes(name))

    filtered.forEach(contact => {
        const chatId = `${contact.number}@c.us`;
        
        client.sendMessage(chatId, 'Pun10 ganggu... 😪')
            .then(msg => console.log(`Message sent to ${contact.name}`.bgGreen.black));
    });
});

// client.on('message', message => {
//     client.sendMessage(message.from, 'Hello too..');
// });

client.initialize();
