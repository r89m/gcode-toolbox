import {Command, CommandType} from './command';

export class SetUnitsCommand extends Command {

  constructor(public readonly units: Units, comment: string = '') {
    super(CommandType.SET_UNITS, comment);
  }

  output(): string {

    if (this.units === Units.MM) {
      return 'G21';
    } else {
      return 'G20';
    }
  }
}

export enum Units {
  MM, INCHES
}
