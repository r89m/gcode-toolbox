import {Transform, TransformResult} from '../transform';
import {Line} from "../../../../gcode/src/line/line";

export class MinimiseRapidsTransform implements Transform<Line> {

  transform(incoming: Line[]): TransformResult<Line> {
    return {
      result : incoming
    };
  }
}
