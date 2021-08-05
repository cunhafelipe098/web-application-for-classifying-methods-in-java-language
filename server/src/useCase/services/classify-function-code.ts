import { ClassifierCode, MetricExtractor } from "@/useCase/contracts/entities";
import { ClassifyFunctionCode } from "@/useCase/contracts/usecases/classifier-code";
import { ClassifyFunction } from "@/useCase/contracts";
import { ImpossibleClassify } from "@/useCase/contracts/errors/impossible-classify";

export class  ClassifyFunctionCodeService implements ClassifyFunctionCode {

  constructor (private readonly classifyFunction: ClassifyFunction) {}

  async classify (metricExtractor: MetricExtractor): Promise<ClassifierCode> {
    if (metricExtractor.language.name !== 'java') {
      throw new ImpossibleClassify()
    }
    return this.classifyFunction.ClassifyFunction(metricExtractor)
  }
}
