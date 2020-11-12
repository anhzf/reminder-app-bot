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
  constructor() {
    super('Command Not Found!');
  }
}

export default class CommandList {
  private prefix: string = '';

  private list: Command[] = [];

  constructor({ commands, ...ops }: CommandListContructor) {
    commands?.forEach((command) => this.add(command));
    this.setupOptions(ops);
  }

  /**
   * listen
   */
  public listen(msg: Message) {
    const { command } = CommandList.parseMessage(msg.body);
    const runned = this.list.find((v) => this.buildCommand(v.name) === command);

    if (runned) runned.action(msg, this, Client);
    else throw new CommandNotFound();
  }

  /**
     * add command
     */
  public add(command: Command) {
    this.list.push(command);
  }

  /**
   * listing command in array form
   */
  public getCommandList() {
    return this.list;
  }

  private static parseMessage(msgBody: string): ParsedMessage {
    const [
      command,
    ] = msgBody.split(' ');

    return { command };
  }

  private buildCommand(commandName: string): string {
    return `${this.prefix}${commandName}`;
  }

  private setupOptions(ops: CommandListOps) {
    this.prefix = ops.prefix || '!';
  }
}
