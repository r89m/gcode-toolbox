"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var minimise_rapids_transform_1 = require("../ffdsfs/transform/minimise-rapids/minimise-rapids.transform");
var Pipeline = /** @class */ (function () {
    function Pipeline(generator, transforms) {
        this.generator = generator;
        this.transforms = transforms;
    }
    Pipeline.prototype.do = function () {
        new minimise_rapids_transform_1.MinimiseRapidsTransform();
    };
    return Pipeline;
}());
exports.Pipeline = Pipeline;
