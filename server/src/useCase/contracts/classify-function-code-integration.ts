import { ClassifierCodeModel } from "@/useCase/models";
import { MetricExtractor } from "@/useCase/contracts/entities";

export interface ClassifyFunction {
  ClassifyFunction: (metricExtractor: MetricExtractor) => Promise<ClassifierCodeModel>
}