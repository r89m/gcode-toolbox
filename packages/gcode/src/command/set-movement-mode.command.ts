import {Command, CommandType} from './command';

export class SetMovementModeCommand extends Command {

  constructor(public readonly mode: MovementMode, comment: string = '') {
    super(CommandType.SET_MOVEMENT_MODE, comment);
  }

  output(): string {

    if (this.mode === MovementMode.ABSOLUTE) {
      return 'G90';
    } else {
      return 'G91';
    }
  }
}

export enum MovementMode {
  RELATIVE, ABSOLUTE
}
