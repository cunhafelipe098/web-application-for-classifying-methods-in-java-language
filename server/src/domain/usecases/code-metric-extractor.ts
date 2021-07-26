import { MetricExtractor } from '@/domain/entities'

export interface CodeMetricExtractor {
  extracts: (metricExtractor: MetricExtractor) => Promise<MetricExtractor>
} 