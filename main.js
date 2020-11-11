import qrcode, { error } from 'qrcode-terminal';
import { setSession } from './src/Auth.js';
import client from './src/Client.js';
import scheduled from 'node-schedule';
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
        'Bapak',
        'Happy family 👨‍👩‍👧‍👦👱🏻‍♀🧑🏻🧑🧑🏼',
        'Ifah'
    ].includes(name))

    scheduled.scheduleJob('00 * * * * *', function () {
        const time = (new Date).toLocaleString();

        filtered.forEach(contact => {
            const chatId = `${contact.number}@c.us`;

            client.sendMessage(chatId, `*Pun10 ganggu... 🙏*
*Pesan ini dikirim setiap detik ke 00*
[${time}]
            `)
                .then(msg => console.log(`[${time}]: Message sent to ${contact.name}`));
        });
    })
});

// client.on('message', message => {
//     client.sendMessage(message.from, 'Hello too..');
// });

client.initialize();
