"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassifyFunctionCodeService = void 0;
const impossible_classify_1 = require("@/domain/errors/impossible-classify");
class ClassifyFunctionCodeService {
    constructor(classifyFunction) {
        this.classifyFunction = classifyFunction;
    }
    async classify(metricExtractor) {
        if (metricExtractor.language.name !== 'java') {
            throw new impossible_classify_1.ImpossibleClassify();
        }
        return this.classifyFunction.ClassifyFunction(metricExtractor);
    }
}
exports.ClassifyFunctionCodeService = ClassifyFunctionCodeService;
