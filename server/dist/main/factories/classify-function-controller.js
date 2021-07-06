"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeClassifyFunctionController = void 0;
const services_1 = require("@/datalayer/services");
const integration_1 = require("@/infra/integration");
const controllers_1 = require("@/presentation/controllers");
const makeClassifyFunctionController = () => {
    const integration = new integration_1.ExtractClassify();
    const classify = new services_1.ClassifyFunctionCodeService(integration);
    return new controllers_1.ClassifyFunctionController(classify);
};
exports.makeClassifyFunctionController = makeClassifyFunctionController;
