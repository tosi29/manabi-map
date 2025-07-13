export interface LearningMemo {
  id: string
  title: string
  content: string
  source?: string
  sourceUrl?: string
  topics: string[]
  createdAt: string
  summary?: string
  isImportant?: boolean
  srs?: SRSData
}

export interface SRSData {
  easeFactor: number
  interval: number
  repetitions: number
  nextReviewDate: string
  lastReviewDate?: string
  quality?: number
}

export interface Topic {
  name: string
  count: number
  color?: string
}