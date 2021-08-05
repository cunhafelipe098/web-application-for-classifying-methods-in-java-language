export type MetricExtractor = {
  language: Language
  content: string
  metrics: Metric[]
}

type Language = {
  name: string
}

type Metric = {
  name: string 
  score: number
}