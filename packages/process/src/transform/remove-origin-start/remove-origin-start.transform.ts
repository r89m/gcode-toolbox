import {TransformResult} from "@transform/transform";
import {ReplaceableIterator} from "@util/replaceable.iterator";
import {Command, CommandType, CommentCommand, MoveFeed, MoveRapid} from "gcode-toolbox-gcode";
import {ParsedLineTransform} from "@transform/parsed-line.transform";

export class RemoveOriginStartTransform extends ParsedLineTransform{
    transform(incoming: Command[]): TransformResult<Command> {
        const linesIterator = new ReplaceableIterator(incoming);

        let item:IteratorResult<Command>;
        while(item = linesIterator.next(), !item.done) {
            const line = item.value;
            if (this.isLinearMove(line)) {
                if (line.x == 0 && line.y == 0) {
                    linesIterator.replace(new CommentCommand("Move to origin replaced"));
                    break;
                }
            }
        }

        return {
            result: incoming
        }
    }

    isLinearMove(line:Command):line is MoveRapid | MoveFeed {
        return line.type == CommandType.MOVE_LINEAR;
    }

}