import { LearningMemo } from '../types/memo'
import { CalendarDays, ExternalLink, BookOpen, Star, Calendar } from 'lucide-react'
import { getDaysUntilReview } from '../utils/srsAlgorithm'

interface MemoCardProps {
  memo: LearningMemo
  onToggleImportant?: (memoId: string) => void
}

function MemoCard({ memo, onToggleImportant }: MemoCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const daysUntilReview = memo.srs ? getDaysUntilReview(memo.srs) : null

  return (
    <article className={`bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-200 ${
      memo.isImportant ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 flex-1">
          {memo.title}
        </h3>
        <div className="flex items-center gap-3 ml-4">
          {onToggleImportant && (
            <button
              onClick={() => onToggleImportant(memo.id)}
              className={`p-1 rounded-full transition-colors ${
                memo.isImportant 
                  ? 'text-yellow-600 hover:text-yellow-700' 
                  : 'text-gray-400 hover:text-yellow-500'
              }`}
              title={memo.isImportant ? '重要フラグを解除' : '重要としてマーク'}
            >
              <Star className={`w-4 h-4 ${memo.isImportant ? 'fill-current' : ''}`} />
            </button>
          )}
          
          <div className="flex items-center text-sm text-gray-500">
            <CalendarDays className="w-4 h-4 mr-1" />
            {formatDate(memo.createdAt)}
          </div>
        </div>
      </div>

      {memo.isImportant && daysUntilReview !== null && (
        <div className="flex items-center mb-3 text-sm">
          <Calendar className="w-3 h-3 mr-1 text-yellow-600" />
          <span className="text-yellow-700">
            {daysUntilReview <= 0 ? '復習期限' : `${daysUntilReview}日後に復習`}
          </span>
        </div>
      )}

      {memo.summary && (
        <p className="text-gray-600 text-sm mb-3 font-medium">
          {memo.summary}
        </p>
      )}

      <p className="text-gray-700 mb-4 leading-relaxed">
        {memo.content}
      </p>

      {memo.source && (
        <div className="flex items-center mb-4 text-sm text-gray-600">
          <BookOpen className="w-4 h-4 mr-2" />
          <span>出典: </span>
          {memo.sourceUrl ? (
            <a
              href={memo.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline ml-1 flex items-center"
            >
              {memo.source}
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          ) : (
            <span className="ml-1">{memo.source}</span>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {memo.topics.map((topic) => (
          <span
            key={topic}
            className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
          >
            {topic}
          </span>
        ))}
      </div>
    </article>
  )
}

export default MemoCard