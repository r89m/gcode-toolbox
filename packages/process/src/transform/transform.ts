import {Command} from "gcode-toolbox-gcode";

export class RawLine {}
export type FileElement = Command | string;
export type FileElementType = typeof Command | typeof RawLine;

export interface Transform<L extends FileElement> {

    getType(): FileElementType;

    transform(incoming: L[]): TransformResult<L>
}

export class TransformResult<L extends FileElement> {

    readonly result: L[];
    readonly status?: any;
}