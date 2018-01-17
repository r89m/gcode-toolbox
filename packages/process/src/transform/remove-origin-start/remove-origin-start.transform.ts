import {Transform} from "../transform";
import {TransformResult} from "../transform";
import {ReplaceableIterator} from "../../util/replaceable.iterator";
import {Command, CommandType} from "../../../../gcode/src/command/command";
import {MoveFeed, MoveRapid} from "../../../../gcode/src/command/move-linear.command";
import {CommentCommand} from "../../../../gcode/src/command/comment.command";
import {ParsedLineTransform} from "../parsed-line.transform";

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