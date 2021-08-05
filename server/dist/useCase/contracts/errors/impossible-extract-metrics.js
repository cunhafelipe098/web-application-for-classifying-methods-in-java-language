"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpossibleExtract = void 0;
class ImpossibleExtract extends Error {
    constructor() {
        super('Impossible to extract metrics');
        this.name = 'ImpossibleExtract';
    }
}
exports.ImpossibleExtract = ImpossibleExtract;
