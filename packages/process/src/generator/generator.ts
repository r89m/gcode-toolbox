import {Line} from "../../../gcode/src/line/line";

export interface Generator {

    supportedExtensions():string[];

    generate(filename: string, input: Blob):Line[];
}