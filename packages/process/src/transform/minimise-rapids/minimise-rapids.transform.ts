import {Transform, TransformResult} from '../transform';
import {Line} from "../../../../gcode/src/line/line";
import {ParsedLineTransform} from "../parsed-line.transform";

export class MinimiseRapidsTransform extends ParsedLineTransform{

  transform(incoming: Line[]): TransformResult<Line> {
    return {
      result : incoming
    };
  }
}
