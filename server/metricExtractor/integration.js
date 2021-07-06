var exec = require('child_process').exec;
var fs = require('fs');


exec('java -jar /home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/metricExtractor/MetricExtractor.jar /home/felipe/Documentos/Estudo/Estudo_Faculdade/TCC/web-application-for-classifying-methods-in-java-language/server/metricExtractor/samples.txt dir',
  function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
            console.log('exec error: ' + error);
      }
  }
);
console.log('ssssssssssss');

//return fs.readFileSync('samples_metric_output/mlcc_input.file')
