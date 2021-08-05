"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeMetricExtractorService = void 0;
const errors_1 = require("@/useCase/contracts/errors");
class CodeMetricExtractorService {
    constructor(metricExtractor) {
        this.metricExtractor = metricExtractor;
    }
    async extracts(metricExtractor) {
        if (!metricExtractor.content) {
            throw new errors_1.ImpossibleExtract();
        }
        return this.metricExtractor.ExtractMetricsFunctionCode(metricExtractor);
    }
}
exports.CodeMetricExtractorService = CodeMetricExtractorService;
