"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassifyFunctionCodeService = void 0;
const impossible_classify_1 = require("@/domain/errors/impossible-classify");
class ClassifyFunctionCodeService {
    constructor(classifyFunctionCodeIntegration) {
        this.classifyFunctionCodeIntegration = classifyFunctionCodeIntegration;
    }
    async classify(functionCode) {
        if (functionCode.language.name !== 'java') {
            throw new impossible_classify_1.ImpossibleClassify();
        }
        return this.classifyFunctionCodeIntegration.ClassifyFunctionCode(functionCode);
    }
}
exports.ClassifyFunctionCodeService = ClassifyFunctionCodeService;
