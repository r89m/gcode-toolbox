import {Line, LineType} from "./line";

export class DwellLine extends Line {
    constructor(public readonly millis: number, comments?: string) {
        super(LineType.DWELL, comments);
    }
}