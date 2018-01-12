import {Line, LineType} from "./line";

export class PlaneSelectionLine extends Line {
    constructor(public readonly plane: Plane, comment: string = undefined) {
        super(LineType.PLANE_SELECTION, comment);
    }
}

export enum Plane {XY, ZX, YZ}