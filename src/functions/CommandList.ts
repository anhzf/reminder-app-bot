/* eslint-disable max-classes-per-file */
import { Message } from 'whatsapp-web.js';

export interface Command {
  command: string;
  callback: (msg: Message) => void;
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
    commands?.forEach(({ command, callback }) => this.add(command, callback));
    this.setupOptions(ops);
  }

  /**
   * listen
   */
  public listen(msg: Message) {
    const { command } = CommandList.parseMessage(msg.body);
    const runned = this.list.find((v) => this.buildCommand(v.command) === command);

    if (runned) runned.callback(msg);
    else throw new CommandNotFound();
  }

  /**
     * add command
     */
  public add(command: string, callback: (msg: Message) => void) {
    this.list.push({ command, callback });
  }

  /**
   * listing command in array form
   */
  public getCommands(): string[] {
    return this.list.map((v) => v.command);
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
