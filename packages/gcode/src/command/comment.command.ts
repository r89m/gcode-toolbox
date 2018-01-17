import {Command, CommandType} from './command';

export class CommentCommand extends Command {
  constructor(comment: string) {
    super(CommandType.COMMENT, comment);
  }
}
