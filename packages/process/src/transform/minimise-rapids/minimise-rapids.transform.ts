import {Transform} from '../transform';
import {TransformResult} from '../transform';
import {GCodeFile} from "../../../../gcode/src/gcode-file";

export class MinimiseRapidsTransform implements Transform {

  transform(incoming: GCodeFile): TransformResult {
    return {
      result : incoming
    };
  }
}
