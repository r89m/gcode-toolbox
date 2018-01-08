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
var SetToolStateLine = /** @class */ (function (_super) {
    __extends(SetToolStateLine, _super);
    function SetToolStateLine(toolState, comments) {
        if (comments === void 0) { comments = ''; }
        var _this = _super.call(this, line_1.LineType.TOOL_STATE, comments) || this;
        _this.toolState = toolState;
        return _this;
    }
    SetToolStateLine.prototype.output = function () {
        return 'M106 S' + this.toolState;
    };
    return SetToolStateLine;
}(line_1.Line));
exports.SetToolStateLine = SetToolStateLine;
exports.ToolState = {
    ON: 255,
    OFF: 0
};
