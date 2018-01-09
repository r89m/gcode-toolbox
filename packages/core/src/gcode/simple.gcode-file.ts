import {GCodeFile} from "./gcode-file";
import {Parser} from "./parser/parser";
import {Line} from "./line/line";

export class SimpleGcodeFile implements GCodeFile {

    constructor(private lines:string[]){}

    getLines(): string[] {
        return this.lines;
    }

    getParsedLines(parser: Parser): Line[] {
        let parsedLines:Line[] = [];

        for (let line of this.getLines()) {
            parsedLines.push(parser.parse(line));
        }

        return parsedLines;
    }
}