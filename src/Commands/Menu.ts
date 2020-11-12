import { Message } from 'whatsapp-web.js';
import { PoweredClient } from '../Client.js';
import constants from '../constants.js';
import CommandList, { Command } from '../functions/CommandList.js';
import WhatsappFormat from '../helpers/WhatsappFormat.js';

const MenuCommand: Command = {
  name: 'menu',
  description: 'Listing available menu',
  action(msg: Message, context: CommandList, client: PoweredClient) {
    const title = WhatsappFormat.bold('📋 Reminder-App Command List 📋');
    const divider = '-'.repeat(constants.maxRowLength);
    const listed = context.getCommandList().map((v) => {
      const formattedCommand = WhatsappFormat.bold(v.name).padEnd(15);
      const formattedDesc = v.description;
      const row = `${formattedCommand}${formattedDesc}`;

      return row;
    });
    const footer = WhatsappFormat.code('Developped by Anhzf');

    const message = `${WhatsappFormat.center(title, '-')}

${listed.join('\n')}

${divider}
${WhatsappFormat.right(footer)}`;
    client.sendMessage(msg.from, message);
  },
};

export default MenuCommand;
