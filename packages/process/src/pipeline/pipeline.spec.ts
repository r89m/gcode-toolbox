import {DefaultProfile, MoveFeed, MoveRapid} from "gcode-toolbox-gcode";
import {StatusReporter} from "./pipeline";
import {PipelineBuilder} from "./pipeline.builder";
import {CycleTimeAnalysis} from "../analysis/cycle-time/cycle-time.analysis";

describe("Pipeline Test", () => {

    const machineProfile = new DefaultProfile();

    it("should handle a simple pipeline with parsed input", () => {

        const reporter = new TestReporter();

        const pipeline = new PipelineBuilder(machineProfile)
            .analyse(new CycleTimeAnalysis())
            .report(reporter)
            .build();

        const input = [
            new MoveFeed(0, 0, 0),
            new MoveFeed(100, 200, undefined, 1000),
            new MoveFeed(undefined, 100),
            new MoveRapid(0, 0, undefined, 50)
        ];

        expect(pipeline.run(input)).toEqual(input);

        expect(reporter.reportedStatuses.length).toEqual(1);
        expect(reporter.reportedStatuses[0]).toEqual({
            totalDuration: 138,
            feedDuration: 18,
            rapidDuration: 120
        });
    });
});

class TestReporter implements StatusReporter {

    public reportedStatuses: any[] = [];

    report(status: any): void {
        this.reportedStatuses.push(status);
    }
}