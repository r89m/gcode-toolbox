import {EnsureFirstRapidHasSensibleFeedrateTransform} from "./ensure-first-rapid-has-sensible-feedrate.transform";
import {SimpleGcodeFile} from "../../../gcode/simple.gcode-file";

describe("Ensure first move has sensible feedrate Transform", () => {

    const transform = function(targetFeedrate:number, lines:string[]):string[] {

        return new EnsureFirstRapidHasSensibleFeedrateTransform(targetFeedrate).transform(new SimpleGcodeFile(lines)).result.getLines();
    };

    it("should leave", () => {

        const lines = [
            "This is the first line", "Another line", "Final line"
        ];

        expect(transform(400, lines)).toEqual(["", "", ""])
    });

});