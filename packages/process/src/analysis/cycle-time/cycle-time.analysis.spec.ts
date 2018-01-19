import {
    CycleTimeAnalysis, CycleTimeAnalysisResults, MoveFeed, MovementMode, MoveRapid, Plane, PlaneSelectionCommand,
    SetMovementModeCommand, SpindleDirection, SpindleOnCommand
} from "gcode-toolbox-gcode";

describe("Cycle Time Analysis", () => {

    const analyse = (input): CycleTimeAnalysisResults => {
        return new CycleTimeAnalysis().analyse(input);
    };

    it("should report nothing for an empty file", () => {

        expect(analyse([])).toEqual({
            totalDuration: 0,
            feedDuration: 0,
            rapidDuration: 0
        });
    });

    it("should report nothing for a file with no moves", () => {

        const input = [
            new PlaneSelectionCommand(Plane.XY),
            new SetMovementModeCommand(MovementMode.ABSOLUTE),
            new SpindleOnCommand(SpindleDirection.Clockwise)
        ];

        expect(analyse(input)).toEqual({
            totalDuration: 0,
            feedDuration: 0,
            rapidDuration: 0
        });
    });

    it("should report nothing for a file with only one move", () => {

        const input = [
            new MoveFeed(30, 10, 50)
        ];

        expect(analyse(input)).toEqual({
            totalDuration: 0,
            feedDuration: 0,
            rapidDuration: 0
        });
    });

    it("should report the correct duration for a file with only one feed move", () => {

        const input = [
            new MoveFeed(30, 10, 50, 100),
            new MoveFeed(130)
        ];

        expect(analyse(input)).toEqual({
            totalDuration: 60,
            feedDuration: 60,
            rapidDuration: 0
        });
    });

    it("should report the correct duration for a file with only feed moves", () => {

        const input = [
            new MoveFeed(30, 10, 50, 100),
            new MoveFeed(130),
            new MoveFeed(undefined, 50, 100, 300)
        ];

        expect(analyse(input)).toEqual({
            totalDuration: 70,
            feedDuration: 70,
            rapidDuration: 0
        });
    });

    it("should report the correct duration for a file with only one rapid move", () => {

        const input = [
            new MoveRapid(30, 10, 50, 100),
            new MoveRapid(130)
        ];

        expect(analyse(input)).toEqual({
            totalDuration: 60,
            feedDuration: 0,
            rapidDuration: 60
        });
    });

    it("should report the correct duration for a file with only rapid moves", () => {

        const input = [
            new MoveRapid(30, 10, 50, 100),
            new MoveRapid(130),
            new MoveRapid(undefined, 50, 100, 300)
        ];

        expect(analyse(input)).toEqual({
            totalDuration: 70,
            feedDuration: 0,
            rapidDuration: 70
        });
    });

    fit("should report the correct duration for a file with feed and rapid moves", () => {

        const input = [
            new MoveRapid(30, 10, 50, 100),
            new MoveFeed(undefined, undefined, 0, 50),
            new MoveFeed(130, undefined, undefined, 1000),
            new MoveFeed(undefined, 210),
            new MoveFeed(30),
            new MoveFeed(undefined, 10),
            new MoveRapid(undefined, undefined, 50),
            new MoveRapid(undefined, 50, 100)
        ];

        expect(analyse(input)).toEqual({
            totalDuration: 102,
            feedDuration: 96,
            rapidDuration: 6
        });
    });
});