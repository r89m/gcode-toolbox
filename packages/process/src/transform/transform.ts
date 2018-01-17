import {RawLine} from "../../../gcode/src/raw-line";
import {Command} from "../../../gcode/src/command/command";

export type FileElement = Command | RawLine
export type FileElementType = typeof Command | typeof RawLine;

export interface Transform<FileElement> {

    getType(): FileElementType;

    transform(incoming: FileElement[]): TransformResult<FileElement>
}

export class TransformResult<FileElement> {

    readonly result: FileElement[];
    readonly status?: any;
}