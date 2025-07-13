import { LearningMemo } from '../types/memo'

export type SerendipityMode = 'random' | 'forgetting-curve' | 'related' | 'growth' | 'intelligent'

export interface SerendipityResult {
  memo: LearningMemo
  reason: string
  mode: SerendipityMode
}

export function calculateForgettingCurveScore(memo: LearningMemo): number {
  const now = new Date()
  const createdDate = new Date(memo.createdAt)
  const daysSinceCreated = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
  
  // 30-90日前のメモを最も高く評価
  if (daysSinceCreated >= 30 && daysSinceCreated <= 90) {
    return 1.0
  } else if (daysSinceCreated >= 15 && daysSinceCreated < 30) {
    return 0.8
  } else if (daysSinceCreated > 90 && daysSinceCreated <= 180) {
    return 0.6
  } else if (daysSinceCreated > 180) {
    return 0.4
  } else {
    return 0.1 // 15日以内は低い優先度
  }
}

export function calculateTopicSimilarity(topics1: string[], topics2: string[]): number {
  if (topics1.length === 0 || topics2.length === 0) return 0
  
  const intersection = topics1.filter(topic => topics2.includes(topic))
  const union = [...new Set([...topics1, ...topics2])]
  
  return intersection.length / union.length
}

export function calculateRelatedScore(targetMemo: LearningMemo, recentMemos: LearningMemo[]): number {
  if (recentMemos.length === 0) return 0
  
  // 最近7日間のメモとの関連性を計算
  const recentTopics = recentMemos.flatMap(memo => memo.topics)
  const uniqueRecentTopics = [...new Set(recentTopics)]
  
  return calculateTopicSimilarity(targetMemo.topics, uniqueRecentTopics)
}

export function calculateGrowthScore(memo: LearningMemo, allMemos: LearningMemo[]): number {
  // 同じトピックを含むメモの中で、最も古いメモほど高スコア
  const sameTopicMemos = allMemos.filter(m => 
    m.id !== memo.id && m.topics.some(topic => memo.topics.includes(topic))
  )
  
  if (sameTopicMemos.length === 0) return 0
  
  const sortedMemos = sameTopicMemos.sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
  
  const memoIndex = sortedMemos.findIndex(m => m.id === memo.id)
  if (memoIndex === -1) return 0
  
  // 古いメモほど高スコア（最古=1.0, 最新=0.1）
  return 1.0 - (memoIndex / sortedMemos.length) * 0.9
}

export function analyzeLearningDensity(memos: LearningMemo[], targetPeriodDays: number = 7): { topic: string, density: number }[] {
  const now = new Date()
  const cutoffDate = new Date(now.getTime() - targetPeriodDays * 24 * 60 * 60 * 1000)
  
  const recentMemos = memos.filter(memo => new Date(memo.createdAt) >= cutoffDate)
  const topicCounts: Record<string, number> = {}
  
  recentMemos.forEach(memo => {
    memo.topics.forEach(topic => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1
    })
  })
  
  return Object.entries(topicCounts)
    .map(([topic, count]) => ({ topic, density: count / targetPeriodDays }))
    .sort((a, b) => b.density - a.density)
}

export function getRecentMemos(memos: LearningMemo[], days: number = 7): LearningMemo[] {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  return memos.filter(memo => new Date(memo.createdAt) >= cutoffDate)
}

export function generateSerendipityReason(mode: SerendipityMode, memo: LearningMemo): string {
  const daysSince = Math.floor((new Date().getTime() - new Date(memo.createdAt).getTime()) / (1000 * 60 * 60 * 24))
  
  switch (mode) {
    case 'forgetting-curve':
      if (daysSince >= 30 && daysSince <= 90) {
        return `${daysSince}日前の学びです。忘却曲線的に復習にちょうど良いタイミング！`
      } else if (daysSince > 90) {
        return `${daysSince}日前の学びです。久しぶりの再会ですね`
      } else {
        return `${daysSince}日前の学びです。まだ記憶に新しいかも`
      }
    
    case 'related':
      return '最近学習しているトピックと関連性の高い過去の学びです'
    
    case 'growth':
      return 'このトピックの初期の学習記録です。成長を振り返ってみましょう'
    
    case 'intelligent':
      return '複数の要素を考慮して選ばれた、今のあなたにとって価値のある学びです'
    
    case 'random':
    default:
      return '完全にランダムに選ばれた、思いがけない再発見です'
  }
}