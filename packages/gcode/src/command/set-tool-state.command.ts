import {Command, CommandType} from './command';

export class SetToolStateCommand extends Command {

  constructor(public readonly toolState: number, comments: string = '') {
    super(CommandType.TOOL_STATE, comments);
  }

  output(): string {
    return 'M106 S' + this.toolState;
  }
}

export const ToolState = {
  ON: 255,
  OFF: 0
};
