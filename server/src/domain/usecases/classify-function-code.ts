import { FunctionCode } from '@/domain/entities'

export interface ClassifyFunctionCode {
  classify: (functionCode: FunctionCode) => Promise<FunctionCode>
} 