import {Transform} from "../transform";
import {TransformResult} from "../transform";
import {ReplaceableIterator} from "../../util/replaceable.iterator";
import {Line, LineType} from "../../../../gcode/src/line/line";
import {MoveRapid} from "../../../../gcode/src/line/move-linear.line";

export class EnsureFirstRapidHasSensibleFeedrateTransform implements Transform<Line> {

    constructor(private feedrate:number) {}

    transform(incoming: Line[]): TransformResult<Line> {

        const lineIterator = new ReplaceableIterator(incoming);

        let item:IteratorResult<Line>;
        while (item = lineIterator.next(), !item.done) {
            const line = item.value;
            if (line instanceof MoveRapid) {
                lineIterator.replace(new MoveRapid(line.x, line.y, line.z, line.feedRate || this.feedrate));
                break;
            }
        }

        return {
            result: incoming
        };
    }

}