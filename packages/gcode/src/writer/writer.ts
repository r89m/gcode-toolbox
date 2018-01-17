import {Command} from "../command/command";

export interface Writer {

    write(command:Command):string;
}