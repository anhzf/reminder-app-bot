import { Contact, ContactId, Message } from 'whatsapp-web.js';
import Client from '../Client';
import { Command } from '../functions/CommandList';
import WhatsappFormat from '../helpers/WhatsappFormat';

export interface Profile {
  id: ContactId,
  number: string,
  publicName: string,
  isGroup: boolean,
  isBusiness: boolean,
  isEnterprise: boolean,
}

const ProfileCommand: Command = {
  name: 'profile',
  description: 'Get your profile data from database',
  action(msg: Message) {
    msg.getContact()
      .then(({
        id, number, pushname: publicName, isGroup, isBusiness, isEnterprise,
      }:Contact) => {
        const profile: Profile = {
          id, number, publicName, isGroup, isBusiness, isEnterprise,
        };
        const profileString = JSON.stringify({ ...profile }, null, '\t');
        Client.sendMessage(msg.from, WhatsappFormat.code(profileString));
      });
  },
};

export default ProfileCommand;
