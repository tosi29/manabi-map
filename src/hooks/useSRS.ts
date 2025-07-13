import { useCallback } from 'react'
import { LearningMemo } from '../types/memo'

export function useSRS(memos: LearningMemo[], setMemos: (memos: LearningMemo[]) => void) {
  const toggleImportant = useCallback((memoId: string) => {
    setMemos(memos.map(memo => {
      if (memo.id === memoId) {
        return {
          ...memo,
          isImportant: !memo.isImportant
        }
      }
      return memo
    }))
  }, [memos, setMemos])

  return {
    toggleImportant
  }
}