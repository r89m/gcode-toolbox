import {FileElementType, Transform, TransformResult} from "./transform";
import {Command} from "../../../gcode/src/command/command";

export abstract class ParsedLineTransform implements Transform<Command> {

    abstract transform(incoming: Command[]): TransformResult<Command>

    getType(): FileElementType {
        return Command;
    }
}