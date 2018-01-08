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
var SetUnitsLine = /** @class */ (function (_super) {
    __extends(SetUnitsLine, _super);
    function SetUnitsLine(units, comment) {
        if (comment === void 0) { comment = ''; }
        var _this = _super.call(this, line_1.LineType.SET_UNITS, comment) || this;
        _this.units = units;
        return _this;
    }
    SetUnitsLine.prototype.output = function () {
        if (this.units === Units.MM) {
            return 'G21';
        }
        else {
            return 'G20';
        }
    };
    return SetUnitsLine;
}(line_1.Line));
exports.SetUnitsLine = SetUnitsLine;
var Units;
(function (Units) {
    Units[Units["MM"] = 0] = "MM";
    Units[Units["INCHES"] = 1] = "INCHES";
})(Units = exports.Units || (exports.Units = {}));
