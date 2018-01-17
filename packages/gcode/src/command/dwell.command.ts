import {Command, CommandType} from "./command";

export class DwellCommand extends Command {
    constructor(public readonly millis: number, comments?: string) {
        super(CommandType.DWELL, comments);
    }
}