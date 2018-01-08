import {GCodeFile} from "../../gcode/gcode-file";

export interface Generator<I> {

    generate(input:I):GCodeFile;
}