import {Transform, TransformResult} from "./transform";
import {Line} from "../../../gcode/src/line/line";

export abstract class ParsedLineTransform implements Transform<Line> {

    abstract transform(incoming: Line[]): TransformResult<Line>

}