import { ClassifyFunctionCode } from "@/domain/usecases/classify-function-code";
import { Controller, HttpResponse } from "@/presentation/contracts";

export class ClassifyFunctionController implements  Controller{

  constructor (private readonly classifyFunctionCode: ClassifyFunctionCode) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const functionCode = await this.classifyFunctionCode.classify(request)
      return {
        statusCode: 200,
        data: functionCode
      }
    } catch (error) {
        return {
          statusCode: 500,
          data: error.stack
        }
    }
  }
}