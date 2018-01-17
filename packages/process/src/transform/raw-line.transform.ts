import {FileElementType, Transform, TransformResult} from "./transform";
import {RawLine} from "../../../gcode/src/raw-line";

export abstract class RawLineTransform implements Transform<RawLine> {

    abstract transform(incoming:RawLine[]): TransformResult<RawLine>

    getType(): FileElementType {
        return RawLine;
    }

}