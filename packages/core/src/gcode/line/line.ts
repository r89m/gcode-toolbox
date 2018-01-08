export abstract class Line {
  constructor(public readonly type: LineType = LineType.UNKNOWN, public comment: string = "") {
  }

  abstract output(): string;
}

export enum LineType {
  UNKNOWN, BLANK, COMMENT, SET_UNITS, SET_MOVEMENT_MODE, MOVE_LINEAR, MOVE_ARC, DWELL, TOOL_STATE
}
