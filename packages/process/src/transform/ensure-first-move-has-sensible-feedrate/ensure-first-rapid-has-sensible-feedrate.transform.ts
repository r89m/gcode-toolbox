import {Transform} from "../transform";
import {TransformResult} from "../transform";
import {ReplaceableIterator} from "../../util/replaceable.iterator";
import {Command, CommandType} from "../../../../gcode/src/command/command";
import {MoveRapid} from "../../../../gcode/src/command/move-linear.command";
import {ParsedLineTransform} from "../parsed-line.transform";

export class EnsureFirstRapidHasSensibleFeedrateTransform extends ParsedLineTransform{

    constructor(private feedrate:number) {
        super();
    }

    transform(incoming: Command[]): TransformResult<Command> {

        const lineIterator = new ReplaceableIterator(incoming);

        let item:IteratorResult<Command>;
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