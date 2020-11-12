import { Message } from 'whatsapp-web.js';
import Client from '../Client';
import { Command } from '../functions/CommandList';
import WhatsappFormat from '../helpers/WhatsappFormat';
import command from './index';

const MenuCommand: Command = {
  name: 'menu',
  description: 'Listing menu',
  action(msg: Message) {
    const listed = command.getCommandList().map((v) => {
      const formattedCommand = WhatsappFormat.bold(v.name).padEnd(10);
      const formattedDesc = v.description;
      const row = `${formattedCommand}${formattedDesc}`;

      return row;
    });

    Client.sendMessage(msg.from, listed.join('\n'));
  },
};

export default MenuCommand;
