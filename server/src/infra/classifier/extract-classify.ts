import { ClassifyFunction } from "@/datalayer/contracts";
import { MetricExtractor } from "@/domain/entities";
import { ClassifierCodeModel } from "@/datalayer/models"; 

const util = require('util');
var exec = util.promisify(require('child_process').exec);
var fs = require('fs');

export class Classify implements ClassifyFunction {
  async ClassifyFunction (metricExtractor: MetricExtractor): Promise<ClassifierCodeModel> {
    let scoreList = []
    for(let i = 0; i < metricExtractor.metrics.length; i++) {
      scoreList.push(metricExtractor.metrics[i].score)
    }
   
    await exec(`python3 /home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/classificationModel/runModel.py ${scoreList}`);
    let classification = fs.readFileSync('/home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/classificationModel/output.txt', {encoding:'utf8', flag:'r'})
    
    return {
      classification: classification[1] == 1 ? true : false,
      predictProba: classification.substring(4,15)
    }
  }
}