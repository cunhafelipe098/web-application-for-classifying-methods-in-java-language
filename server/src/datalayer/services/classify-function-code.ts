import { FunctionCode } from "@/domain/entities";
import { ClassifyFunctionCode } from "@/domain/usecases/classify-function-code";
import { ClassifyFunctionCodeIntegration } from "@/datalayer/contracts";
import { ImpossibleClassify } from "@/domain/errors/impossible-classify";

export class  ClassifyFunctionCodeService implements ClassifyFunctionCode {

  constructor (private readonly classifyFunctionCodeIntegration: ClassifyFunctionCodeIntegration) {}

  async classify (functionCode: FunctionCode): Promise<FunctionCode> {
    if (functionCode.language.name !== 'java') {
      throw new ImpossibleClassify()
    }
    return this.classifyFunctionCodeIntegration.ClassifyFunctionCode(functionCode)
  }
}