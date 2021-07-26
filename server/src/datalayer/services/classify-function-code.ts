import { ClassifierCode, MetricExtractor } from "@/domain/entities";
import { ClassifyFunctionCode } from "@/domain/usecases/classifier-code";
import { ClassifyFunction } from "@/datalayer/contracts";
import { ImpossibleClassify } from "@/domain/errors/impossible-classify";

export class  ClassifyFunctionCodeService implements ClassifyFunctionCode {

  constructor (private readonly classifyFunction: ClassifyFunction) {}

  async classify (metricExtractor: MetricExtractor): Promise<ClassifierCode> {
    if (metricExtractor.language.name !== 'java') {
      throw new ImpossibleClassify()
    }
    return this.classifyFunction.ClassifyFunction(metricExtractor)
  }
}