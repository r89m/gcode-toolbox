import {Line, LineType} from "./line";

export class FanOnLine extends Line {
    constructor(public readonly speed:number, comment?:string){
        super(LineType.FAN_CONTROL, comment);
    }
}

export class FanOffLine extends Line{
    constructor(comment?:string){
        super(LineType.FAN_CONTROL, comment);
    }
}