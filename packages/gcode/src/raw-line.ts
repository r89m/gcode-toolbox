import {FileElement} from "./file.element";

export class RawLine implements FileElement {

    constructor(public readonly line: string){}
}