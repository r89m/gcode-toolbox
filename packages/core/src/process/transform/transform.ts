import {TransformResult} from './transform-result';
import {GCodeFile} from "../../gcode/gcode-file";

export interface Transform {

  transform(incoming: GCodeFile): TransformResult;
}
