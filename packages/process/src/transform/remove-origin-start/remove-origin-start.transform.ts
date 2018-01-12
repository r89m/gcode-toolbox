import {Transform} from "../transform";
import {TransformResult} from "../transform";
import {ReplaceableIterator} from "../../util/replaceable.iterator";
import {Line, LineType} from "../../../../gcode/src/line/line";
import {MoveFeed, MoveRapid} from "../../../../gcode/src/line/move-linear.line";
import {CommentLine} from "../../../../gcode/src/line/comment.line";

export class RemoveOriginStartTransform implements Transform<Line> {
    transform(incoming: Line[]): TransformResult<Line> {
        const linesIterator = new ReplaceableIterator(incoming);

        let item:IteratorResult<Line>;
        while(item = linesIterator.next(), !item.done) {
            const line = item.value;
            if (this.isLinearMove(line)) {
                if (line.x == 0 && line.y == 0) {
                    linesIterator.replace(new CommentLine("Move to origin replaced"));
                    break;
                }
            }
        }

        return {
            result: incoming
        }
    }

    isLinearMove(line:Line):line is MoveRapid | MoveFeed {
        return line.type == LineType.MOVE_LINEAR;
    }

}