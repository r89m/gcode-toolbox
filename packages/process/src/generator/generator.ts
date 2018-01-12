import {GCodeFile} from "../../../gcode/src/gcode-file";

export interface Generator {

    supportedExtensions():string[];

    generate(filename: string, input: Blob):GCodeFile;
}