import { useState, useCallback } from 'react'
import { LearningMemo } from '../types/memo'
import { 
  SerendipityMode, 
  SerendipityResult,
  calculateForgettingCurveScore,
  calculateRelatedScore,
  calculateGrowthScore,
  getRecentMemos,
  generateSerendipityReason
} from '../utils/learningCurveAnalysis'

export function useSerendipity(memos: LearningMemo[]) {
  const [currentResult, setCurrentResult] = useState<SerendipityResult | null>(null)
  const [selectedMode, setSelectedMode] = useState<SerendipityMode>('intelligent')

  const getSerendipityMemoByMode = useCallback((mode: SerendipityMode): SerendipityResult | null => {
    if (memos.length === 0) return null

    const candidateMemos = memos.filter(memo => memo.id !== currentResult?.memo.id)
    if (candidateMemos.length === 0) return null

    let selectedMemo: LearningMemo
    let reason: string

    switch (mode) {
      case 'random': {
        const randomIndex = Math.floor(Math.random() * candidateMemos.length)
        selectedMemo = candidateMemos[randomIndex]
        reason = generateSerendipityReason('random', selectedMemo)
        break
      }

      case 'forgetting-curve': {
        const scoredMemos = candidateMemos.map(memo => ({
          memo,
          score: calculateForgettingCurveScore(memo)
        })).filter(item => item.score > 0)

        if (scoredMemos.length === 0) {
          selectedMemo = candidateMemos[Math.floor(Math.random() * candidateMemos.length)]
        } else {
          // 重み付きランダム選択
          const totalWeight = scoredMemos.reduce((sum, item) => sum + item.score, 0)
          let random = Math.random() * totalWeight
          
          for (const item of scoredMemos) {
            random -= item.score
            if (random <= 0) {
              selectedMemo = item.memo
              break
            }
          }
          selectedMemo = selectedMemo! || scoredMemos[0].memo
        }
        reason = generateSerendipityReason('forgetting-curve', selectedMemo)
        break
      }

      case 'related': {
        const recentMemos = getRecentMemos(memos, 7)
        const scoredMemos = candidateMemos.map(memo => ({
          memo,
          score: calculateRelatedScore(memo, recentMemos)
        })).filter(item => item.score > 0)

        if (scoredMemos.length === 0) {
          selectedMemo = candidateMemos[Math.floor(Math.random() * candidateMemos.length)]
        } else {
          const sortedMemos = scoredMemos.sort((a, b) => b.score - a.score)
          selectedMemo = sortedMemos[0].memo
        }
        reason = generateSerendipityReason('related', selectedMemo)
        break
      }

      case 'growth': {
        const scoredMemos = candidateMemos.map(memo => ({
          memo,
          score: calculateGrowthScore(memo, memos)
        })).filter(item => item.score > 0)

        if (scoredMemos.length === 0) {
          selectedMemo = candidateMemos[Math.floor(Math.random() * candidateMemos.length)]
        } else {
          const sortedMemos = scoredMemos.sort((a, b) => b.score - a.score)
          selectedMemo = sortedMemos[0].memo
        }
        reason = generateSerendipityReason('growth', selectedMemo)
        break
      }

      case 'intelligent': {
        // 複数の要素を組み合わせた重み付きスコア
        const recentMemos = getRecentMemos(memos, 7)
        const scoredMemos = candidateMemos.map(memo => {
          const forgettingScore = calculateForgettingCurveScore(memo) * 0.4
          const relatedScore = calculateRelatedScore(memo, recentMemos) * 0.3
          const growthScore = calculateGrowthScore(memo, memos) * 0.2
          const randomScore = Math.random() * 0.1
          
          return {
            memo,
            score: forgettingScore + relatedScore + growthScore + randomScore
          }
        })

        const sortedMemos = scoredMemos.sort((a, b) => b.score - a.score)
        selectedMemo = sortedMemos[0].memo
        reason = generateSerendipityReason('intelligent', selectedMemo)
        break
      }

      default:
        selectedMemo = candidateMemos[Math.floor(Math.random() * candidateMemos.length)]
        reason = generateSerendipityReason('random', selectedMemo)
    }

    return { memo: selectedMemo, reason, mode }
  }, [memos, currentResult])

  const shuffleMemo = useCallback((mode?: SerendipityMode) => {
    const targetMode = mode || selectedMode
    const result = getSerendipityMemoByMode(targetMode)
    setCurrentResult(result)
  }, [selectedMode, getSerendipityMemoByMode])

  const changeMode = useCallback((mode: SerendipityMode) => {
    setSelectedMode(mode)
    const result = getSerendipityMemoByMode(mode)
    setCurrentResult(result)
  }, [getSerendipityMemoByMode])

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
    currentResult,
    currentMemo: currentResult?.memo || null,
    selectedMode,
    shuffleMemo,
    changeMode,
    getRandomMemoFromPast
  }
}