import {Line, LineType} from './line';

export class CommentLine extends Line {

  constructor(comment: string) {
    super(LineType.COMMENT, comment);
  }

  output(): string {
    return '';
  }
}
