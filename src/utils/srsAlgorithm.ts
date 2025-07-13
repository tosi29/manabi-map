import { SRSData } from '../types/memo'

export function calculateNextReview(
  currentSRS: SRSData | undefined,
  quality: number
): SRSData {
  if (!currentSRS) {
    return {
      easeFactor: 2.5,
      interval: 1,
      repetitions: 1,
      nextReviewDate: getDateAfterDays(1),
      lastReviewDate: new Date().toISOString(),
      quality
    }
  }

  const { easeFactor, interval, repetitions } = currentSRS
  
  let newEaseFactor = easeFactor
  let newInterval = interval
  let newRepetitions = repetitions

  if (quality >= 3) {
    if (repetitions === 0) {
      newInterval = 1
    } else if (repetitions === 1) {
      newInterval = 6
    } else {
      newInterval = Math.round(interval * easeFactor)
    }
    newRepetitions = repetitions + 1
  } else {
    newRepetitions = 0
    newInterval = 1
  }

  newEaseFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  )

  return {
    easeFactor: newEaseFactor,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReviewDate: getDateAfterDays(newInterval),
    lastReviewDate: new Date().toISOString(),
    quality
  }
}

export function isReviewDue(srs: SRSData | undefined): boolean {
  if (!srs) return false
  
  const today = new Date()
  const reviewDate = new Date(srs.nextReviewDate)
  
  return today >= reviewDate
}

export function getDateAfterDays(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

export function getDaysUntilReview(srs: SRSData | undefined): number {
  if (!srs) return 0
  
  const today = new Date()
  const reviewDate = new Date(srs.nextReviewDate)
  const diffTime = reviewDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}