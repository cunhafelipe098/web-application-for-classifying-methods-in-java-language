import { FunctionCodeModel } from "@/datalayer/models";
import { FunctionCode } from "@/domain/entities";

export interface ClassifyFunctionCodeIntegration {
  ClassifyFunctionCode: (functionCode: FunctionCode) => Promise<FunctionCodeModel>
}