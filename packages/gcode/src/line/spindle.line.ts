import {Line, LineType} from "./line";

export class SpindleOnLine extends Line {
    constructor(public readonly direction:SpindleDirection, public readonly rpm:number, comment?:string) {
        super(LineType.SPINDLE_ON, comment)
    }
}
export enum SpindleDirection {Clockwise, AntiClockwise}

export class SpindleOffLine extends Line {
    constructor(comment?:string) {
        super(LineType.SPINDLE_OFF, comment);
    }
}