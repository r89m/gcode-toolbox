import {Transform} from "../process/transform/transform";
import {Analysis} from "../process/analysis/analysis";
import {GCodeFile} from "../gcode/gcode-file";
import {TransformResult} from "../process/transform/transform";
import {Pipeline} from "./pipeline";
import {Generator} from "../process/generator/generator";

export class PipelineBuilder {

    private generator: Generator;
    private transforms: Transform[] = [];

    transform(transform:Transform): PipelineBuilder {
        this.transforms.push(transform);
        return this;
    }

    analyse(analysis:Analysis): PipelineBuilder {
        return this.transform(new AnalysisWrapper(analysis));
    }

    build():Pipeline {
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