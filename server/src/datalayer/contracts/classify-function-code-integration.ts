import { ClassifierCodeModel } from "@/datalayer/models";
import { MetricExtractor } from "@/domain/entities";

export interface ClassifyFunction {
  ClassifyFunction: (metricExtractor: MetricExtractor) => Promise<ClassifierCodeModel>
}