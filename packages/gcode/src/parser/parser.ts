import {Command} from "../command/command";

export interface Parser {

    parse(lines: string[]): Command[];
}