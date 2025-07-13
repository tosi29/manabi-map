import { Shuffle, CalendarDays, BookOpen, ExternalLink, Brain, TrendingUp, Link2, Sparkles } from 'lucide-react'
import { SerendipityMode, SerendipityResult } from '../utils/learningCurveAnalysis'

interface SerendipityCardProps {
  result: SerendipityResult | null
  selectedMode: SerendipityMode
  onShuffle: () => void
  onModeChange: (mode: SerendipityMode) => void
}

function SerendipityCard({ result, selectedMode, onShuffle, onModeChange }: SerendipityCardProps) {
  const memo = result?.memo
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getModeIcon = (mode: SerendipityMode) => {
    switch (mode) {
      case 'forgetting-curve': return <Brain className="w-4 h-4" />
      case 'related': return <Link2 className="w-4 h-4" />
      case 'growth': return <TrendingUp className="w-4 h-4" />
      case 'intelligent': return <Sparkles className="w-4 h-4" />
      default: return <Shuffle className="w-4 h-4" />
    }
  }

  const getModeLabel = (mode: SerendipityMode) => {
    switch (mode) {
      case 'forgetting-curve': return '忘却曲線'
      case 'related': return '関連性'
      case 'growth': return '成長実感'
      case 'intelligent': return 'インテリジェント'
      default: return 'ランダム'
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          {getModeIcon(selectedMode)}
          <span className="ml-2">今日のセレンディピティ</span>
          <span className="ml-2 text-sm font-normal text-purple-600">
            ({getModeLabel(selectedMode)})
          </span>
        </h2>
        <button
          onClick={onShuffle}
          className="text-purple-600 hover:text-purple-800 p-2 rounded-full hover:bg-purple-100 transition-colors"
          title="別のメモを表示"
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </div>

      {/* モード選択 */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {(['intelligent', 'forgetting-curve', 'related', 'growth', 'random'] as SerendipityMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onModeChange(mode)}
              className={`flex items-center text-xs px-3 py-1 rounded-full transition-colors ${
                selectedMode === mode
                  ? 'bg-purple-200 text-purple-800'
                  : 'bg-white text-purple-600 hover:bg-purple-100'
              }`}
            >
              {getModeIcon(mode)}
              <span className="ml-1">{getModeLabel(mode)}</span>
            </button>
          ))}
        </div>
      </div>

      {memo ? (
        <div className="space-y-3">
          {/* 選択理由の表示 */}
          {result?.reason && (
            <div className="bg-purple-100 text-purple-800 text-xs p-2 rounded-lg">
              💡 {result.reason}
            </div>
          )}
          
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