export type FunctionCode = {
  language: Language
  content: string
  predictProba: string
  classification: boolean
  metrics: Metric[]
}

type Language = {
  name: string
}

type Metric = {
  name: string 
  score: number
}