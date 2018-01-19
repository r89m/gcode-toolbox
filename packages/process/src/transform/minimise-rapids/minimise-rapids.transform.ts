import {Command} from "gcode-toolbox-gcode";
import {TransformResult} from '@transform/transform';
import {ParsedLineTransform} from "@transform/parsed-line.transform";

export class MinimiseRapidsTransform extends ParsedLineTransform{

  transform(incoming: Command[]): TransformResult<Command> {
    return {
      result : incoming
    };
  }
}
