import { ClassifierCode } from '@/useCase/contracts/entities'
import { MetricExtractor } from '@/useCase/contracts/entities'

export interface ClassifyFunctionCode {
  classify: (metricExtractor: MetricExtractor) => Promise<ClassifierCode>
} 