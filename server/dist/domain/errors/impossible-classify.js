"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpossibleClassify = void 0;
class ImpossibleClassify extends Error {
    constructor() {
        super('Impossible to classify');
        this.name = 'ImpossibleClassify';
    }
}
exports.ImpossibleClassify = ImpossibleClassify;
