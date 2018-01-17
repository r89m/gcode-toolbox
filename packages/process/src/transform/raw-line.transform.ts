import {Transform, TransformResult} from "./transform";

export abstract class RawLineTransform implements Transform<string> {

    abstract transform(incoming:string[]): TransformResult<string>

}