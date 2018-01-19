import {Command} from "gcode-toolbox-gcode";
import {FileElementType, Transform, TransformResult} from "./transform";

export abstract class ParsedLineTransform implements Transform<Command> {

    abstract transform(incoming: Command[]): TransformResult<Command>

    getType(): FileElementType {
        return Command;
    }
}