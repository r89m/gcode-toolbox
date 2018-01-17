import {Command} from "../../../gcode/src/command/command";

export interface Generator {

    supportedExtensions():string[];

    generate(filename: string, input: Blob):Command[];
}