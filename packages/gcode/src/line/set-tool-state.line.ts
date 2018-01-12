import {Line, LineType} from './line';

export class SetToolStateLine extends Line {

  constructor(public readonly toolState: number, comments: string = '') {
    super(LineType.TOOL_STATE, comments);
  }

  output(): string {
    return 'M106 S' + this.toolState;
  }
}

export const ToolState = {
  ON: 255,
  OFF: 0
};
