import {Line, LineType} from "./line";

export class UnknownLine extends Line {

    constructor(public readonly content:string) {
        super(LineType.UNKNOWN);
    }
}