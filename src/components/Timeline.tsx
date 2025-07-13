import React from 'react'
import { LearningMemo } from '../types/memo'
import MemoCard from './MemoCard'

interface TimelineProps {
  memos: LearningMemo[]
}

function Timeline({ memos }: TimelineProps) {
  const sortedMemos = [...memos].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  if (sortedMemos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          メモが見つかりません
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        学習の記録 ({sortedMemos.length}件)
      </h2>
      
      <div className="space-y-4">
        {sortedMemos.map((memo) => (
          <MemoCard key={memo.id} memo={memo} />
        ))}
      </div>
    </div>
  )
}

export default Timeline