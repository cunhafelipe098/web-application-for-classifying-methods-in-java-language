"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factories_1 = require("@/main/factories");
const adapters_1 = require("@/main/adapters");
exports.default = (router) => {
    router.post('/function-code/classify', adapters_1.adaptRoute(factories_1.makeClassifyFunctionController()));
};
