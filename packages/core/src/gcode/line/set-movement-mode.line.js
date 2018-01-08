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
var SetMovementModeLine = /** @class */ (function (_super) {
    __extends(SetMovementModeLine, _super);
    function SetMovementModeLine(mode, comment) {
        if (comment === void 0) { comment = ''; }
        var _this = _super.call(this, line_1.LineType.SET_MOVEMENT_MODE, comment) || this;
        _this.mode = mode;
        return _this;
    }
    SetMovementModeLine.prototype.output = function () {
        if (this.mode === MovementMode.ABSOLUTE) {
            return 'G90';
        }
        else {
            return 'G91';
        }
    };
    return SetMovementModeLine;
}(line_1.Line));
exports.SetMovementModeLine = SetMovementModeLine;
var MovementMode;
(function (MovementMode) {
    MovementMode[MovementMode["RELATIVE"] = 0] = "RELATIVE";
    MovementMode[MovementMode["ABSOLUTE"] = 1] = "ABSOLUTE";
})(MovementMode = exports.MovementMode || (exports.MovementMode = {}));
