import { MetricExtractorModel } from "@/useCase/models";
import { MetricExtractor } from "@/useCase/contracts/entities";

export interface ExtractMetrics {
  ExtractMetricsFunctionCode: (metricExtractor: MetricExtractor) => Promise<MetricExtractorModel>
}