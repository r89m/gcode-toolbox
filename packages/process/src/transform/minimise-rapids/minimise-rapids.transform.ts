import {Transform, TransformResult} from '../transform';
import {Command} from "../../../../gcode/src/command/command";
import {ParsedLineTransform} from "../parsed-line.transform";

export class MinimiseRapidsTransform extends ParsedLineTransform{

  transform(incoming: Command[]): TransformResult<Command> {
    return {
      result : incoming
    };
  }
}
