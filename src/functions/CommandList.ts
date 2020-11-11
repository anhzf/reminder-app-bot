/* eslint-disable max-classes-per-file */
import { Message } from 'whatsapp-web.js';

export interface Command {
  name: string;
  action: (msg: Message) => void;
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
    commands?.forEach(({ name, action }) => this.add(name, action));
    this.setupOptions(ops);
  }

  /**
   * listen
   */
  public listen(msg: Message) {
    const { command } = CommandList.parseMessage(msg.body);
    const runned = this.list.find((v) => this.buildCommand(v.name) === command);

    if (runned) runned.action(msg);
    else throw new CommandNotFound();
  }

  /**
     * add command
     */
  public add(name: string, action: (msg: Message) => void) {
    this.list.push({ name, action });
  }

  /**
   * listing command in array form
   */
  public getCommands(): string[] {
    return this.list.map((v) => v.name);
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
