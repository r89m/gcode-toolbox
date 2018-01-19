import {Generator} from "./generator";
import {RawLineGenerator} from "./raw-line.generator";
import {Command, Parser} from "gcode-toolbox-gcode";

export class ParsedLineGenerator implements Generator<Command> {

    constructor(private readonly parser:Parser, private readonly lineSource:Generator<string> = new RawLineGenerator()) {}

    supportedExtensions(): string[] {
        return this.lineSource.supportedExtensions();
    }

    generate(filename: string, input: Buffer): Command[] {
        return this.parser.parse(this.lineSource.generate(filename, input));
    }
}