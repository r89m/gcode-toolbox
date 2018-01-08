"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RemoveCommentsTransform = /** @class */ (function () {
    function RemoveCommentsTransform() {
    }
    RemoveCommentsTransform.prototype.transform = function (incoming) {
        return {
            result: incoming,
            status: {}
        };
    };
    return RemoveCommentsTransform;
}());
exports.RemoveCommentsTransform = RemoveCommentsTransform;
