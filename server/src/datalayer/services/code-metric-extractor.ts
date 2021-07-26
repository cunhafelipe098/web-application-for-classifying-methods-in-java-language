import { MetricExtractor } from "@/domain/entities";
import { ImpossibleExtract } from "@/domain/errors";
import { CodeMetricExtractor } from "@/domain/usecases/code-metric-extractor";
import { ExtractMetrics } from "@/datalayer/contracts";

export class CodeMetricExtractorService implements CodeMetricExtractor {

  constructor (private readonly metricExtractor: ExtractMetrics) {}

  async extracts (metricExtractor: MetricExtractor): Promise<MetricExtractor> {
    if (!metricExtractor.content) {
      throw new ImpossibleExtract()
    }
    return this.metricExtractor.ExtractMetricsFunctionCode(metricExtractor)
  }
}