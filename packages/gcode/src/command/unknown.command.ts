import {Command, CommandType} from "./command";

export class UnknownCommand extends Command {

    constructor(public readonly content:string) {
        super(CommandType.UNKNOWN);
    }
}