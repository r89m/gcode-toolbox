import {Transform} from "../process/transform/transform";
import {Analysis} from "../process/analysis/analysis";
import {GCodeFile} from "../gcode/gcode-file";
import {TransformResult} from "../process/transform/transform-result";
import {Pipeline} from "./pipeline";
import {Generator} from "../process/generator/generator";

export class PipelineBuilder<I> {

    private generator: Generator<I>;
    private transforms: Transform[] = [];

    transform(transform:Transform): PipelineBuilder<I> {
        this.transforms.push(transform);
        return this;
    }

    analyse(analysis:Analysis): PipelineBuilder<I> {
        return this.transform(new AnalysisWrapper(analysis));
    }

    build():Pipeline<I> {
        return new Pipeline(this.generator, this.transforms);
    }
}

class AnalysisWrapper implements Transform {

    constructor(private analysis:Analysis) {}

    transform(incoming: GCodeFile): TransformResult {
        return {
            result: incoming,
            status: this.analysis.analyse(incoming)
        };
    }
}