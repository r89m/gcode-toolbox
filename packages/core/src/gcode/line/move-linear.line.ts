import {Line, LineType} from './line';

abstract class MoveLinearLine extends Line {

  constructor(public readonly moveType: MoveType,
              public readonly x?: number,
              public readonly y?: number,
              public readonly z?: number,
              public readonly feedRate?: number,
              comment?: string) {
    super(LineType.MOVE_LINEAR, comment);
  }

  output(): string {

    let gcode_str = 'G';
    if (this.moveType === MoveType.FEED) {
      gcode_str += '1';
    } else {
      gcode_str += '0';
    }

    if (this.x !== undefined) {
      gcode_str += ' X' + this._format_distance(this.x);
    }

    if (this.y !== undefined) {
      gcode_str += ' Y' + this._format_distance(this.y);
    }

    if (this.z !== undefined) {
      gcode_str += ' Z' + this._format_distance(this.z);
    }

    if (this.feedRate !== undefined) {
      gcode_str += ' F' + this._format_distance(this.feedRate);
    }

    return gcode_str;
  }

  private _format_distance(num: number): string {
    return String(num);
  }
}

export class MoveRapid extends MoveLinearLine {
  constructor(x?: number, y?: number, z?: number, feedRate?: number, comment: string = '') {
    super(MoveType.RAPID, x, y, z, feedRate, comment);
  }
}

export class MoveFeed extends MoveLinearLine {
  constructor(x?: number, y?: number, z?: number, feedRate?: number, comment: string = '') {
    super(MoveType.FEED, x, y, z, feedRate, comment);
  }
}

export enum MoveType {
  RAPID, FEED
}
