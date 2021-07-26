import { MetricExtractorModel } from "@/datalayer/models";
import { MetricExtractor } from "@/domain/entities";

export interface ExtractMetrics {
  ExtractMetricsFunctionCode: (metricExtractor: MetricExtractor) => Promise<MetricExtractorModel>
}