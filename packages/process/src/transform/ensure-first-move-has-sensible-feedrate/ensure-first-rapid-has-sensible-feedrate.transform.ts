import {Command, CommandType, MoveRapid} from "gcode-toolbox-gcode";
import {TransformResult} from "@transform/transform";
import {ParsedLineTransform} from "@transform/parsed-line.transform";
import {ReplaceableIterator} from "@util/replaceable.iterator";

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