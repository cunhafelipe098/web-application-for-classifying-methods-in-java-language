import { MetricExtractor } from '@/useCase/contracts/entities'

export interface CodeMetricExtractor {
  extracts: (metricExtractor: MetricExtractor) => Promise<MetricExtractor>
} 