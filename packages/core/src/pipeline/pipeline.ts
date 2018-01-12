import {Generator} from "../process/generator/generator";
import {Transform} from "../process/transform/transform";

export class Pipeline {

    constructor(private generator: Generator, private transforms: Transform[]) {
    }

    run(filename:string, source: Blob): void {

        let value = this.generator.generate(filename, source);

        for (let transform of this.transforms) {
            const result = transform.transform(value);
            value = result.result;
            if (result.status) {
                console.log(result.status)
            }
        }
    }
}
