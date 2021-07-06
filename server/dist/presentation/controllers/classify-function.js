"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassifyFunctionController = void 0;
class ClassifyFunctionController {
    constructor(classifyFunctionCode) {
        this.classifyFunctionCode = classifyFunctionCode;
    }
    async handle(request) {
        try {
            const functionCode = await this.classifyFunctionCode.classify(request);
            return {
                statusCode: 200,
                data: functionCode
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
