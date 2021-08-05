import { Controller } from "@/presentation/contracts";
import { CodeMetricExtractorService, ClassifyFunctionCodeService } from '@/useCase/services'
import { Extractor } from '@/infra/extractor'
import { Classify } from '@/infra/classifier'
import { ClassifyFunctionController } from '@/presentation/controllers'

export const makeClassifyFunctionController = (): Controller => {
  const extractor = new Extractor() 
  const metricExtractor = new CodeMetricExtractorService(extractor)

  const classify = new Classify()
  const classifyFunctionCodeService = new ClassifyFunctionCodeService(classify)
  return new ClassifyFunctionController(metricExtractor, classifyFunctionCodeService)
}