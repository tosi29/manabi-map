import { useState, useCallback } from 'react'
import { LearningMemo } from '../types/memo'

export function useSerendipity(memos: LearningMemo[]) {
  const [currentMemo, setCurrentMemo] = useState<LearningMemo | null>(null)

  const shuffleMemo = useCallback(() => {
    if (memos.length === 0) {
      setCurrentMemo(null)
      return
    }

    if (memos.length === 1) {
      setCurrentMemo(memos[0])
      return
    }

    let newMemo: LearningMemo
    do {
      const randomIndex = Math.floor(Math.random() * memos.length)
      newMemo = memos[randomIndex]
    } while (newMemo.id === currentMemo?.id && memos.length > 1)

    setCurrentMemo(newMemo)
  }, [memos, currentMemo])

  const getRandomMemoFromPast = useCallback((daysAgo: number = 30) => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo)

    const oldMemos = memos.filter(memo => 
      new Date(memo.createdAt) <= cutoffDate
    )

    if (oldMemos.length === 0) return null

    const randomIndex = Math.floor(Math.random() * oldMemos.length)
    return oldMemos[randomIndex]
  }, [memos])

  return {
    currentMemo,
    shuffleMemo,
    getRandomMemoFromPast
  }
}