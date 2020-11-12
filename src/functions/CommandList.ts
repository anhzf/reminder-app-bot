/* eslint-disable max-classes-per-file */
import { Message } from 'whatsapp-web.js';
import Client, { PoweredClient } from '../Client.js';

export interface Command {
  name: string;
  action: (msg: Message, context: CommandList, client: PoweredClient) => void;
  description?: string;
}

export interface ParsedMessage {
  command: string;
}

export interface CommandListOps {
  prefix: string;
}

export interface CommandListContructor extends CommandListOps {
  commands?: Command[];
}

export class CommandNotFound extends Error {
  constructor(input: string) {
    super(`${input.bold} - Command Not Found!`);
  }
}

export default class CommandList {
  private prefix: string = '';

  private list: {
    [index: string]: Command
  } = {};

  constructor({ commands, ...ops }: CommandListContructor) {
    this.setupOptions(ops);
    commands?.forEach((command) => this.add(command));
  }

  /**
   * listen
   */
  public listen(msg: Message) {
    const { command } = CommandList.parseMessage(msg.body);

    try {
      this.trigger(command, msg);
    } catch (err) {
      console.log(String(err).bgRed);
    }
  }

  /**
     * add command
     */
  public add(command: Command) {
    if (Object.keys(this.list).includes(command.name)) throw new Error('Duplicate command name!');

    this.list[this.buildCommand(command.name)] = command;
  }

  /**
   * listing command in array form
   */
  public getCommandList() {
    return Object.values(this.list);
  }

  /**
   * listingCommand
   */
  public listingCommand() {
    console.log('Available Command:');
    console.table(this.list);
  }

  /**
   * trigger
   */
  public trigger(msgBody: string, msg: Message) {
    const runned = this.list[msgBody];

    if (runned) return runned.action(msg, this, Client);

    throw new CommandNotFound(msgBody);
  }

  private static parseMessage(msgBody: string): ParsedMessage {
    const [
      command,
    ] = msgBody.split(' ');

    return { command };
  }

  public buildCommand(commandName: string): string {
    return `${this.prefix}${commandName}`;
  }

  private setupOptions(ops: CommandListOps) {
    this.prefix = ops.prefix || '!';
  }
}
