import { MetricExtractor } from "@/useCase/contracts/entities";
import { ImpossibleExtract } from "@/useCase/contracts/errors";
import { CodeMetricExtractor } from "@/useCase/contracts/usecases/code-metric-extractor";
import { ExtractMetrics } from "@/useCase/contracts";

export class CodeMetricExtractorService implements CodeMetricExtractor {

  constructor (private readonly metricExtractor: ExtractMetrics) {}

  async extracts (metricExtractor: MetricExtractor): Promise<MetricExtractor> {
    if (!metricExtractor.content) {
      throw new ImpossibleExtract()
    }
    return this.metricExtractor.ExtractMetricsFunctionCode(metricExtractor)
  }
}