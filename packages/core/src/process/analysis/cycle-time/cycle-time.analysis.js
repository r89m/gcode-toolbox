"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CycleTimeAnalysis = /** @class */ (function () {
    function CycleTimeAnalysis() {
    }
    CycleTimeAnalysis.prototype.analyse = function (incoming) {
        return {
            rapidDuration: 300,
            feedDuration: 400,
            totalDuration: 700
        };
    };
    return CycleTimeAnalysis;
}());
exports.CycleTimeAnalysis = CycleTimeAnalysis;
