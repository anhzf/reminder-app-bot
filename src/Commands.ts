import { Contact, Message } from 'whatsapp-web.js';
import Client from './Client.js';
import CommandList from './functions/CommandList.js';

const command = new CommandList({
  prefix: '!',
  commands: [
    {
      name: 'menu',
      action(msg: Message) {
        msg.reply(command.getCommands().join(','));
      },
    },

    {
      name: 'profile',
      action(msg: Message) {
        msg.getContact()
          .then((value:Contact) => {
            Client.sendMessage(msg.from, JSON.stringify({ ...value }, null, '\t'));
          });
      },
    },
  ],
});

export default command;
