import {Command} from "../../../gcode/src/command/command";

export class RawLine {}
export type FileElement = Command | string;
export type FileElementType = typeof Command | typeof RawLine;

export interface Transform<L extends FileElement> {

    getType(): FileElementType;

    transform(incoming: L[]): TransformResult<L>
}

export class TransformResult<FileElement> {

    readonly result: FileElement[];
    readonly status?: any;
}