"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var line_1 = require("./line");
var MoveLinearLine = /** @class */ (function (_super) {
    __extends(MoveLinearLine, _super);
    function MoveLinearLine(moveType, x, y, z, feedRate, comment) {
        if (comment === void 0) { comment = ''; }
        var _this = _super.call(this, line_1.LineType.MOVE_LINEAR, comment) || this;
        _this.moveType = moveType;
        _this.x = x;
        _this.y = y;
        _this.z = z;
        _this.feedRate = feedRate;
        return _this;
    }
    MoveLinearLine.prototype.output = function () {
        var gcode_str = 'G';
        if (this.moveType === MoveType.FEED) {
            gcode_str += '1';
        }
        else {
            gcode_str += '0';
        }
        if (this.x !== undefined) {
            gcode_str += ' X' + this._format_distance(this.x);
        }
        if (this.y !== undefined) {
            gcode_str += ' Y' + this._format_distance(this.y);
        }
        if (this.z !== undefined) {
            gcode_str += ' Z' + this._format_distance(this.z);
        }
        if (this.feedRate !== undefined) {
            gcode_str += ' F' + this._format_distance(this.feedRate);
        }
        return gcode_str;
    };
    MoveLinearLine.prototype._format_distance = function (num) {
        return String(num);
    };
    return MoveLinearLine;
}(line_1.Line));
var MoveRapid = /** @class */ (function (_super) {
    __extends(MoveRapid, _super);
    function MoveRapid(x, y, z, feedRate, comment) {
        if (comment === void 0) { comment = ''; }
        return _super.call(this, MoveType.RAPID, x, y, z, feedRate, comment) || this;
    }
    return MoveRapid;
}(MoveLinearLine));
exports.MoveRapid = MoveRapid;
var MoveFeed = /** @class */ (function (_super) {
    __extends(MoveFeed, _super);
    function MoveFeed(x, y, z, feedRate, comment) {
        if (comment === void 0) { comment = ''; }
        return _super.call(this, MoveType.FEED, x, y, z, feedRate, comment) || this;
    }
    return MoveFeed;
}(MoveLinearLine));
exports.MoveFeed = MoveFeed;
var MoveType;
(function (MoveType) {
    MoveType[MoveType["RAPID"] = 0] = "RAPID";
    MoveType[MoveType["FEED"] = 1] = "FEED";
})(MoveType = exports.MoveType || (exports.MoveType = {}));
