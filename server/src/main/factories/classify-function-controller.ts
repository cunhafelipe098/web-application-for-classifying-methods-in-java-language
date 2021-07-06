import { Controller } from "@/presentation/contracts";
import { ClassifyFunctionCodeService } from '@/datalayer/services'
import { ExtractClassify } from '@/infra/integration'
import { ClassifyFunctionController } from '@/presentation/controllers'

export const makeClassifyFunctionController = (): Controller => {
  const integration = new ExtractClassify() 
  const classify = new ClassifyFunctionCodeService(integration)
  return new ClassifyFunctionController(classify)
}