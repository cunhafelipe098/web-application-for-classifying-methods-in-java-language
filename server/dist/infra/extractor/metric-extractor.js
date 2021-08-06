"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extractor = void 0;
const util = require('util');
var exec = util.promisify(require('child_process').exec);
var fs = require('fs');
class Extractor {
    async ExtractMetricsFunctionCode(metricExtractor) {
        fs.writeFile("/home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/metricExtractor/sample/samples.java", metricExtractor.content, function (err) {
            if (err)
                throw err;
        });
        await exec('java -jar /home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/metricExtractor/MetricExtractor.jar /home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/metricExtractor/samples.txt dir');
        let metricsTheirValues = fs.readFileSync('/home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/samples_metric_output/mlcc_input.file', { encoding: 'utf8', flag: 'r' });
        let arrayOfBlocosOfMetrics = metricsTheirValues.split('\n').map((item) => item.split(','));
        let metricsName = ['NIF', 'COMP', 'NOS', 'HVOC', 'CREF', 'XMET', 'LMET', 'NOA', 'HDIF', 'VDEC', 'EXCT', 'EXCR', 'NAND', 'VREF', 'NOPR', 'MDN', 'NEXP', 'LOOP', 'NBLTRL', 'NCLTRL', 'NNLTRL', 'NNULLTRL', 'NSLTRL', 'CAST', 'HLTH', 'SLOC', 'NOCL'];
        let metricIndices = [2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30];
        let metricDescription = [
            'Número de declarações if',
            'Métrica de complexidade de McCabe',
            'Número de declarações ',
            'Vocabulário Halstead',
            'Número de classes referenciadas',
            'Métodos externos chamados',
            'Métodos locais chamados',
            'Número de argumentos',
            'Dificuldade do método Halstead',
            'Número de variáveis ​​declaradas',
            'Número de exceções lançadas',
            'Número de exceções referenciadas',
            'Número total de operandos',
            'Número de variáveis ​​referenciadas ',
            'Número total de operadores',
            'Profundidade máxima de aninhamento',
            'Número de expressões ',
            'Número de loops (for, while)',
            'Número de literais booleanos',
            'Número de literais de caracteres',
            'Número de literais numéricos',
            'Número de literais nulos',
            'Número de literais de string',
            'Número de elencos de classe ',
            'Comprimento médio do método',
            'Número de linhas de código-fonte',
            'Número de linhas de comentário'
        ];
        let metrics = [];
        for (let i = 0; i < metricsName.length; i++) {
            metrics.push({
                'name': metricsName[i],
                'score': arrayOfBlocosOfMetrics[1][metricIndices[i]],
                'description': metricDescription[i]
            });
        }
        return {
            content: metricExtractor.content,
            language: metricExtractor.language,
            metrics: metrics
        };
    }
}
exports.Extractor = Extractor;
