export abstract class Line {
    constructor(public readonly type: LineType = LineType.UNKNOWN, public readonly comment?: string) {
    }
}

export enum LineType {
    UNKNOWN, BLANK, COMMENT, SET_UNITS, SET_MOVEMENT_MODE, MOVE_LINEAR, MOVE_ARC, DWELL, PLANE_SELECTION, TOOL_STATE, FAN_CONTROL, SPINDLE_OFF, SPINDLE_ON
}
