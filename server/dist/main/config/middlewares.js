"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("@/main/middlewares");
const cors_1 = __importDefault(require("cors"));
exports.default = (app) => {
    app.use(middlewares_1.bodyParser);
    app.use(cors_1.default());
    app.use(middlewares_1.contentType);
};
