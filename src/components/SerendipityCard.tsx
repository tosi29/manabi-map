import { LearningMemo } from '../types/memo'
import { Shuffle, CalendarDays, BookOpen, ExternalLink } from 'lucide-react'

interface SerendipityCardProps {
  memo: LearningMemo | null
  onShuffle: () => void
}

function SerendipityCard({ memo, onShuffle }: SerendipityCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Shuffle className="w-5 h-5 mr-2 text-purple-600" />
          今日のセレンディピティ
        </h2>
        <button
          onClick={onShuffle}
          className="text-purple-600 hover:text-purple-800 p-2 rounded-full hover:bg-purple-100 transition-colors"
          title="別のメモを表示"
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </div>

      {memo ? (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">{memo.title}</h3>
          
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {memo.content}
          </p>

          <div className="flex items-center text-xs text-gray-500">
            <CalendarDays className="w-3 h-3 mr-1" />
            {formatDate(memo.createdAt)}
          </div>

          {memo.source && (
            <div className="flex items-center text-xs text-gray-600">
              <BookOpen className="w-3 h-3 mr-1" />
              <span>出典: </span>
              {memo.sourceUrl ? (
                <a
                  href={memo.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 underline ml-1 flex items-center"
                >
                  {memo.source}
                  <ExternalLink className="w-2 h-2 ml-1" />
                </a>
              ) : (
                <span className="ml-1">{memo.source}</span>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-1 pt-2">
            {memo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Shuffle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">シャッフルボタンを押して、過去の学びと再会してみましょう</p>
        </div>
      )}
    </div>
  )
}

export default SerendipityCard