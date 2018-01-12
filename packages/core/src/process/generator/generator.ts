import {GCodeFile} from "../../gcode/gcode-file";

export interface Generator {

    supportedExtensions():string[];

    generate(filename: string, input: Blob):GCodeFile;
}