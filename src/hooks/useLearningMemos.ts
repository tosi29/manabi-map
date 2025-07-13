import { useState, useEffect, useMemo } from 'react'
import { LearningMemo, Topic } from '../types/memo'
import { mockMemos } from '../data/mockData'

export function useLearningMemos() {
  const [memos, setMemos] = useState<LearningMemo[]>([])
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  useEffect(() => {
    setMemos(mockMemos)
  }, [])

  const topics: Topic[] = useMemo(() => {
    const topicCounts: Record<string, number> = {}
    
    memos.forEach(memo => {
      memo.topics.forEach(topic => {
        topicCounts[topic] = (topicCounts[topic] || 0) + 1
      })
    })

    return Object.entries(topicCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }, [memos])

  const filteredMemos = useMemo(() => {
    if (!selectedTopic) return memos
    
    return memos.filter(memo => 
      memo.topics.includes(selectedTopic)
    )
  }, [memos, selectedTopic])

  return {
    memos: filteredMemos,
    topics,
    selectedTopic,
    setSelectedTopic
  }
}