import {Line, LineType} from './line';

export class SetUnitsLine extends Line {

  constructor(public readonly units: Units, comment: string = '') {
    super(LineType.SET_UNITS, comment);
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
