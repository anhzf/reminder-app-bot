import { Message } from 'whatsapp-web.js';
import { PoweredClient } from '../Client.js';
import CommandList, { Command } from '../functions/CommandList.js';
import WhatsappFormat from '../helpers/WhatsappFormat.js';

const MenuCommand: Command = {
  name: 'menu',
  description: 'Listing menu',
  action(msg: Message, context: CommandList, client: PoweredClient) {
    const title = WhatsappFormat.bold('[Reminder-App Command List]');
    const listed = context.getCommandList().map((v) => {
      const formattedCommand = WhatsappFormat.bold(v.name).padEnd(15);
      const formattedDesc = v.description;
      const row = `${formattedCommand}${formattedDesc}`;

      return row;
    });
    const footer = ''.padEnd(40, '-');

    const message = `${title}

${listed.join('\n')}

${footer}`;
    client.sendMessage(msg.from, message);
  },
};

export default MenuCommand;
