import {Command, CommandType} from "./command";

export class FanOnCommand extends Command {
    constructor(public readonly speed:number, comment?:string){
        super(CommandType.FAN_CONTROL, comment);
    }
}

export class FanOffCommand extends Command{
    constructor(comment?:string){
        super(CommandType.FAN_CONTROL, comment);
    }
}