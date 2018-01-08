"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pipeline_1 = require("./pipeline");
var PipelineBuilder = /** @class */ (function () {
    function PipelineBuilder() {
        this.transforms = [];
    }
    PipelineBuilder.prototype.transform = function (transform) {
        this.transforms.push(transform);
        return this;
    };
    PipelineBuilder.prototype.analyse = function (analysis) {
        return this.transform(new AnalysisWrapper(analysis));
    };
    PipelineBuilder.prototype.build = function () {
        return new pipeline_1.Pipeline(this.generator, this.transforms);
    };
    return PipelineBuilder;
}());
exports.PipelineBuilder = PipelineBuilder;
var AnalysisWrapper = /** @class */ (function () {
    function AnalysisWrapper(analysis) {
        this.analysis = analysis;
    }
    AnalysisWrapper.prototype.transform = function (incoming) {
        return {
            result: incoming,
            status: this.analysis.analyse(incoming)
        };
    };
    return AnalysisWrapper;
}());
