import { CodeMetricExtractor } from "@/useCase/contracts/usecases/code-metric-extractor";
import { ClassifyFunctionCode } from "@/useCase/contracts/usecases/classifier-code";
import { Controller, HttpResponse } from "@/presentation/contracts";
import { FunctionCodeViewModel } from "@/presentation/view-models/function-code";

export class ClassifyFunctionController implements  Controller{

  constructor (private readonly codeMetricExtractor: CodeMetricExtractor, private readonly classifyFunctionCode: ClassifyFunctionCode) {}

  async handle (request: any): Promise<HttpResponse<FunctionCodeViewModel>> {
    try {
      const metricExtractor = await this.codeMetricExtractor.extracts({content: request.content, language: request.language, metrics: undefined})
      const classification = await this.classifyFunctionCode.classify(metricExtractor)
      
      return {
        statusCode: 200,
        data: { ...classification, metrics: metricExtractor.metrics}
      }
    } catch (error) {
        return {
          statusCode: 500,
          data: error.stack
        }
    }
  }
}