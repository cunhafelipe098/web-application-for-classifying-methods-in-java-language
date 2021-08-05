"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeClassifyFunctionController = void 0;
const services_1 = require("@/useCase/services");
const extractor_1 = require("@/infra/extractor");
const classifier_1 = require("@/infra/classifier");
const controllers_1 = require("@/presentation/controllers");
const makeClassifyFunctionController = () => {
    const extractor = new extractor_1.Extractor();
    const metricExtractor = new services_1.CodeMetricExtractorService(extractor);
    const classify = new classifier_1.Classify();
    const classifyFunctionCodeService = new services_1.ClassifyFunctionCodeService(classify);
    return new controllers_1.ClassifyFunctionController(metricExtractor, classifyFunctionCodeService);
};
exports.makeClassifyFunctionController = makeClassifyFunctionController;
