"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassifyFunctionController = void 0;
class ClassifyFunctionController {
    constructor(codeMetricExtractor, classifyFunctionCode) {
        this.codeMetricExtractor = codeMetricExtractor;
        this.classifyFunctionCode = classifyFunctionCode;
    }
    async handle(request) {
        try {
            const metricExtractor = await this.codeMetricExtractor.extracts({ content: request.content, language: request.language, metrics: undefined });
            const classification = await this.classifyFunctionCode.classify(metricExtractor);
            return {
                statusCode: 200,
                data: { ...classification, metrics: metricExtractor.metrics }
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                data: error.stack
            };
        }
    }
}
exports.ClassifyFunctionController = ClassifyFunctionController;
