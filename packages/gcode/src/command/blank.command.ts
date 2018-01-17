import {Command, CommandType} from './command';

export class BlankCommand extends Command {

  constructor() {
    super(CommandType.BLANK);
  }

  output(): string {
    return '';
  }
}
