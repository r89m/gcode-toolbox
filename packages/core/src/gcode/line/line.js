"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Line = /** @class */ (function () {
    function Line(type, comment) {
        if (type === void 0) { type = LineType.UNKNOWN; }
        if (comment === void 0) { comment = ""; }
        this.type = type;
        this.comment = comment;
    }
    return Line;
}());
exports.Line = Line;
var LineType;
(function (LineType) {
    LineType[LineType["UNKNOWN"] = 0] = "UNKNOWN";
    LineType[LineType["BLANK"] = 1] = "BLANK";
    LineType[LineType["COMMENT"] = 2] = "COMMENT";
    LineType[LineType["SET_UNITS"] = 3] = "SET_UNITS";
    LineType[LineType["SET_MOVEMENT_MODE"] = 4] = "SET_MOVEMENT_MODE";
    LineType[LineType["MOVE_LINEAR"] = 5] = "MOVE_LINEAR";
    LineType[LineType["MOVE_ARC"] = 6] = "MOVE_ARC";
    LineType[LineType["DWELL"] = 7] = "DWELL";
    LineType[LineType["TOOL_STATE"] = 8] = "TOOL_STATE";
})(LineType = exports.LineType || (exports.LineType = {}));
