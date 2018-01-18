import {Generator} from "../generator/generator";
import {Transform} from "../transform/transform";
import {Command} from "../../../gcode/src/command/command";

export class Pipeline<T> {

    constructor(private generator: Generator<T>, private transforms: Transform<Command | string>[]) {
    }

    run(filename:string, source: Buffer): void {

        // TODO: Improve type-safety here
        let value:any = this.generator.generate(filename, source);

        for (let transform of this.transforms) {
            const result = transform.transform(value);
            value = result.result;
            if (result.status) {
                console.log(result.status)
            }
        }
    }
}
