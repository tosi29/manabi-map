import { LearningMemo } from '../types/memo'
import { isReviewDue, getDaysUntilReview } from '../utils/srsAlgorithm'
import { BookMarked, Calendar, CheckCircle2 } from 'lucide-react'

interface ReviewSectionProps {
  memos: LearningMemo[]
  onReviewComplete: (memoId: string, quality: number) => void
}

function ReviewSection({ memos, onReviewComplete }: ReviewSectionProps) {
  const reviewMemos = memos.filter(memo => 
    memo.isImportant && isReviewDue(memo.srs)
  )

  const upcomingReviews = memos.filter(memo => 
    memo.isImportant && memo.srs && !isReviewDue(memo.srs)
  ).sort((a, b) => {
    const daysA = getDaysUntilReview(a.srs)
    const daysB = getDaysUntilReview(b.srs)
    return daysA - daysB
  })

  if (reviewMemos.length === 0 && upcomingReviews.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
        <BookMarked className="w-5 h-5 mr-2 text-green-600" />
        復習管理
      </h2>

      {reviewMemos.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-800 mb-3">
            今日の復習 ({reviewMemos.length}件)
          </h3>
          <div className="space-y-3">
            {reviewMemos.map((memo) => (
              <ReviewCard
                key={memo.id}
                memo={memo}
                onReviewComplete={onReviewComplete}
              />
            ))}
          </div>
        </div>
      )}

      {upcomingReviews.length > 0 && (
        <div>
          <h3 className="text-md font-medium text-gray-800 mb-3">
            今後の復習予定
          </h3>
          <div className="space-y-2">
            {upcomingReviews.slice(0, 5).map((memo) => (
              <div
                key={memo.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {memo.title}
                  </p>
                </div>
                <div className="flex items-center text-xs text-gray-500 ml-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  {getDaysUntilReview(memo.srs)}日後
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface ReviewCardProps {
  memo: LearningMemo
  onReviewComplete: (memoId: string, quality: number) => void
}

function ReviewCard({ memo, onReviewComplete }: ReviewCardProps) {
  const handleQualitySelect = (quality: number) => {
    onReviewComplete(memo.id, quality)
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 className="font-medium text-gray-900 mb-2">{memo.title}</h4>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{memo.content}</p>
      
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-600 mb-2 block">復習の理解度を選択してください:</span>
        {[
          { quality: 5, label: '完璧', color: 'bg-green-600 hover:bg-green-700' },
          { quality: 4, label: '良い', color: 'bg-green-500 hover:bg-green-600' },
          { quality: 3, label: '普通', color: 'bg-yellow-500 hover:bg-yellow-600' },
          { quality: 2, label: '難しい', color: 'bg-orange-500 hover:bg-orange-600' },
          { quality: 1, label: '忘れた', color: 'bg-red-500 hover:bg-red-600' }
        ].map(({ quality, label, color }) => (
          <button
            key={quality}
            onClick={() => handleQualitySelect(quality)}
            className={`text-white text-xs px-3 py-1 rounded-full ${color} transition-colors flex items-center`}
          >
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ReviewSection