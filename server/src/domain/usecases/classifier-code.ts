import { ClassifierCode } from '@/domain/entities'
import { MetricExtractor } from '@/domain/entities'

export interface ClassifyFunctionCode {
  classify: (metricExtractor: MetricExtractor) => Promise<ClassifierCode>
} 