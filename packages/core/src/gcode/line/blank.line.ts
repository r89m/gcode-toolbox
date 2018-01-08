import {Line, LineType} from './line';

export class BlankLine extends Line {

  constructor() {
    super(LineType.BLANK);
  }

  output(): string {
    return '';
  }
}
