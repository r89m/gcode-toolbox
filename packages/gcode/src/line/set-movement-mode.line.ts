import {Line, LineType} from './line';

export class SetMovementModeLine extends Line {

  constructor(public readonly mode: MovementMode, comment: string = '') {
    super(LineType.SET_MOVEMENT_MODE, comment);
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
