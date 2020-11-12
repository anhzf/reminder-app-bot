import { Contact, Message } from 'whatsapp-web.js';
import Client from './Client.js';
import CommandList from './functions/CommandList.js';
import WhatsappFormat from './helpers/WhatsappFormat.js';

const command = new CommandList({
  prefix: '!',
  commands: [
    {
      name: 'menu',
      description: 'Listing menu',
      action(msg: Message) {
        const listed = command.getCommandList().map((v) => {
          const formattedCommand = WhatsappFormat.bold(v.name);
          const formattedDesc = v.description;
          const row = `${formattedCommand}\t\t ${formattedDesc}`;

          return row;
        });

        Client.sendMessage(msg.from, listed.join('\n'));
      },
    },

    {
      name: 'profile',
      description: 'Get your profile data from database',
      action(msg: Message) {
        msg.getContact()
          .then((value:Contact) => {
            const profileString = JSON.stringify({ ...value }, null, '\t');
            Client.sendMessage(msg.from, WhatsappFormat.code(profileString));
          });
      },
    },
  ],
});

export default command;
