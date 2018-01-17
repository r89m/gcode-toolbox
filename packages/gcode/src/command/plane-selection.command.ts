import {Command, CommandType} from "./command";

export class PlaneSelectionCommand extends Command {
    constructor(public readonly plane: Plane, comment: string = undefined) {
        super(CommandType.PLANE_SELECTION, comment);
    }
}

export enum Plane {XY, ZX, YZ}