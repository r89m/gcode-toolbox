import {TransformResult} from './transform-result';
import {Type} from '@angular/core';
import {GCodeFile} from "../../gcode/gcode-file";

export interface Transform {

  transform(incoming: GCodeFile): TransformResult;
}
