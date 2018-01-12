import {Transform} from "../transform";
import {GCodeFile} from "../../../gcode/gcode-file";
import {TransformResult} from "../transform";
import {ReplaceableIterator} from "../../../util/replaceable.iterator";
import {Line, LineType} from "../../../gcode/line/line";
import {MoveFeed, MoveRapid} from "../../../gcode/line/move-linear.line";
import {CommentLine} from "../../../gcode/line/comment.line";
import {SimpleGcodeFile} from "../../../gcode/simple.gcode-file";

export class RemoveOriginStartTransform implements Transform {
    transform(incoming: GCodeFile): TransformResult {
        const linesIterator = new ReplaceableIterator(incoming.getParsedLines(null));

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
            result: new SimpleGcodeFile([])
        }
    }

    isLinearMove(line:Line):line is MoveRapid | MoveFeed {
        return line.type == LineType.MOVE_LINEAR;
    }

}