import {Transform} from "../transform";
import {GCodeFile} from "../../../../../gcode/src/gcode-file";
import {TransformResult} from "../transform";
import {ReplaceableIterator} from "../../../util/replaceable.iterator";
import {SimpleGcodeFile} from "../../../../../gcode/src/simple.gcode-file";
import {Line, LineType} from "../../../../../gcode/src/line/line";
import {MoveRapid} from "../../../../../gcode/src/line/move-linear.line";

export class EnsureFirstRapidHasSensibleFeedrateTransform implements Transform {

    constructor(private feedrate:number) {}

    transform(incoming: GCodeFile): TransformResult {

        const lines = incoming.getParsedLines(null);
        const lineIterator = new ReplaceableIterator(lines);

        let item:IteratorResult<Line>;
        while (item = lineIterator.next(), !item.done) {
            const line = item.value;
            if (line instanceof MoveRapid) {
                lineIterator.replace(new MoveRapid(line.x, line.y, line.z, line.feedRate | this.feedrate));
                break;
            }
        }

        return {
            result: new SimpleGcodeFile([])
        };
    }

}