export interface LearningMemo {
  id: string
  title: string
  content: string
  source?: string
  sourceUrl?: string
  topics: string[]
  createdAt: string
  summary?: string
}

export interface Topic {
  name: string
  count: number
  color?: string
}