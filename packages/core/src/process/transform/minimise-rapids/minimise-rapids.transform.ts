import {Transform} from '../transform';
import {TransformResult} from '../transform-result';
import {GCodeFile} from "../../../gcode/gcode-file";

export class MinimiseRapidsTransform implements Transform {

  transform(incoming: GCodeFile): TransformResult {
    return {
      result : incoming
    };
  }
}
