import {Generator} from "../generator/generator";
import {Transform} from "../transform/transform";
import {Line} from "../../../gcode/src/line/line";

export class Pipeline {

    constructor(private generator: Generator, private transforms: Transform<Line | string>[]) {
    }

    run(filename:string, source: Blob): void {

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
