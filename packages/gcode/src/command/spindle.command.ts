import {Command, CommandType} from "./command";

export class SpindleOnCommand extends Command {
    constructor(public readonly direction:SpindleDirection, public readonly rpm:number, comment?:string) {
        super(CommandType.SPINDLE_ON, comment)
    }
}
export enum SpindleDirection {Clockwise, AntiClockwise}

export class SpindleOffCommand extends Command {
    constructor(comment?:string) {
        super(CommandType.SPINDLE_OFF, comment);
    }
}