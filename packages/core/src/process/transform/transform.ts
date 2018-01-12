import {GCodeFile} from "../../gcode/gcode-file";

export interface Transform {

  transform(incoming: GCodeFile): TransformResult;
}

export class TransformResult {

    readonly result: GCodeFile;
    readonly status?: any;
}