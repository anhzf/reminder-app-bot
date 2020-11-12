import CommandList from '../functions/CommandList.js';
import Menu from './Menu.js';
import Profile from './Profile.js';

const command = new CommandList({
  prefix: '!',
  commands: [
    Menu,
    Profile,
  ],
});

export default command;
