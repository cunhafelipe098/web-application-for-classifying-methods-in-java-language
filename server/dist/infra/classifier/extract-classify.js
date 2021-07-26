"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classify = void 0;
const util = require('util');
var exec = util.promisify(require('child_process').exec);
var fs = require('fs');
class Classify {
    async ClassifyFunction(metricExtractor) {
        let scoreList = [];
        for (let i = 0; i < metricExtractor.metrics.length; i++) {
            scoreList.push(metricExtractor.metrics[i].score);
        }
        await exec(`python3 /home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/classificationModel/runModel.py ${scoreList}`);
        let classification = fs.readFileSync('/home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/classificationModel/output.txt', { encoding: 'utf8', flag: 'r' });
        return {
            classification: classification[1] == 1 ? true : false,
            predictProba: classification.substring(4, 15)
        };
    }
}
exports.Classify = Classify;
