import {Transform, TransformResult} from "../transform/transform";
import {Analysis} from "../analysis/analysis";
import {Pipeline} from "./pipeline";
import {Generator} from "../generator/generator";
import {Line} from "../../../gcode/src/line/line";
import {ParsedLineTransform} from "../transform/parsed-line.transform";

export class PipelineBuilder {

    private generator: Generator;
    private transforms: Transform<Line | string>[] = [];

    transform(transform:Transform<Line | string>): PipelineBuilder {
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

class AnalysisWrapper extends ParsedLineTransform {

    constructor(private analysis:Analysis) {
        super();
    }

    transform(incoming: Line[]): TransformResult<Line> {
        return {
            result: incoming,
            status: this.analysis.analyse(incoming)
        };
    }
}