import { useCallback } from 'react'
import { LearningMemo } from '../types/memo'
import { calculateNextReview } from '../utils/srsAlgorithm'

export function useSRS(memos: LearningMemo[], setMemos: (memos: LearningMemo[]) => void) {
  const handleReviewComplete = useCallback((memoId: string, quality: number) => {
    setMemos(memos.map(memo => {
      if (memo.id === memoId) {
        const newSRS = calculateNextReview(memo.srs, quality)
        return {
          ...memo,
          srs: newSRS
        }
      }
      return memo
    }))
  }, [memos, setMemos])

  const toggleImportant = useCallback((memoId: string) => {
    setMemos(memos.map(memo => {
      if (memo.id === memoId) {
        const isImportant = !memo.isImportant
        return {
          ...memo,
          isImportant,
          srs: isImportant && !memo.srs ? {
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0,
            nextReviewDate: new Date().toISOString()
          } : memo.srs
        }
      }
      return memo
    }))
  }, [memos, setMemos])

  return {
    handleReviewComplete,
    toggleImportant
  }
}