import {FileElement, Transform, TransformResult} from "../transform/transform";
import {Analysis} from "../analysis/analysis";
import {DefaultStatusReporter, Pipeline, StatusReporter} from "./pipeline";
import {Command} from "../../../gcode/src/command/command";
import {ParsedLineTransform} from "../transform/parsed-line.transform";
import {Profile} from "../../../gcode/src/profile/profile";

export class PipelineBuilder {

    private transforms: Transform<FileElement>[] = [];
    private statusReporter: StatusReporter = new DefaultStatusReporter();

    constructor(private readonly machineProfile: Profile) {}

    transform(transform:Transform<FileElement>): PipelineBuilder {
        this.transforms.push(transform);
        return this;
    }

    analyse(analysis:Analysis): PipelineBuilder {
        return this.transform(new AnalysisWrapper(analysis));
    }

    report(statusReporter: StatusReporter): PipelineBuilder {
        this.statusReporter = statusReporter;
        return this;
    }

    build():Pipeline {
        return new Pipeline(this.machineProfile, this.transforms, this.statusReporter);
    }
}

class AnalysisWrapper extends ParsedLineTransform {

    constructor(private analysis:Analysis) {
        super();
    }

    transform(incoming: Command[]): TransformResult<Command> {
        return {
            result: incoming,
            status: this.analysis.analyse(incoming)
        };
    }
}