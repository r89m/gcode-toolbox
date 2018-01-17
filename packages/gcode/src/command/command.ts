import {FileElement} from "../file.element";

export abstract class Command implements FileElement {
    constructor(public readonly type: CommandType = CommandType.UNKNOWN, public readonly comment?: string) {
    }
}

export enum CommandType {
    UNKNOWN, BLANK, COMMENT, SET_UNITS, SET_MOVEMENT_MODE, MOVE_LINEAR, MOVE_ARC, DWELL, PLANE_SELECTION, TOOL_STATE, FAN_CONTROL, SPINDLE_OFF, SPINDLE_ON
}
