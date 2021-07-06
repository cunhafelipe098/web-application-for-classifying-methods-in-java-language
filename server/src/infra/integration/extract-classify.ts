import { ClassifyFunctionCodeIntegration } from "@/datalayer/contracts";
import { FunctionCode } from "@/domain/entities";
import { FunctionCodeModel } from "@/datalayer/models"; 

const util = require('util');
var exec = util.promisify(require('child_process').exec);
var fs = require('fs');

export class ExtractClassify implements ClassifyFunctionCodeIntegration {
  async ClassifyFunctionCode (functionCode: FunctionCode): Promise<FunctionCodeModel> {

    fs.writeFile("/home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/metricExtractor/sample/samples.java", functionCode.content, function(err){
      if (err) throw err;
    })

    await exec('java -jar /home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/metricExtractor/MetricExtractor.jar /home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/metricExtractor/samples.txt dir')
    let metricsTheirValues = fs.readFileSync('/home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/samples_metric_output/mlcc_input.file', {encoding:'utf8', flag:'r'})
    
    let arrayOfBlocosOfMetrics = metricsTheirValues.split('\n').map((item) => item.split(','))
    
    let metricsName = ['NIF', 'COMP', 'NOS',	'HVOC',	'CREF',	'XMET',	'LMET',	'NOA',	'HDIF',	'VDEC',	'EXCT',	'EXCR',	'NAND',	'VREF',	'NOPR',	'MDN',	'NEXP',	'LOOP',	'NBLTRL',	'NCLTRL',	'NNLTRL',	'NNULLTRL',	'NSLTRL',	'CAST',	'HLTH', 'SLOC',	'NOCL']
    let metricIndices = [2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30]
    let metrics = []
    let scoreList = []
    for(let i = 0; i < metricsName.length; i++) {
      metrics.push(
        {
          'name': metricsName[i],
          'score': arrayOfBlocosOfMetrics[1][metricIndices[i]]
        }
        
      )
      scoreList.push(parseFloat(arrayOfBlocosOfMetrics[1][metricIndices[i]]))
    }
   
    await exec(`python3 /home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/classificationModel/runModel.py ${scoreList}`);
    let classification = fs.readFileSync('/home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/classificationModel/output.txt', {encoding:'utf8', flag:'r'})
    
    return {
      language: functionCode.language,
      content: functionCode.content,
      classification: classification[1] == 1 ? true : false,
      metrics: metrics,
      predictProba: classification.substring(4,15)
    }
  }
}