import { Topic } from '../types/memo'
import { Hash, X } from 'lucide-react'

interface TopicFilterProps {
  topics: Topic[]
  selectedTopic: string | null
  onTopicSelect: (topic: string | null) => void
}

function TopicFilter({ topics, selectedTopic, onTopicSelect }: TopicFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Hash className="w-5 h-5 mr-2" />
          トピック
        </h2>
        {selectedTopic && (
          <button
            onClick={() => onTopicSelect(null)}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            title="フィルターをクリア"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {selectedTopic && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>フィルター中:</strong> {selectedTopic}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <button
          onClick={() => onTopicSelect(null)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTopic === null
              ? 'bg-blue-100 text-blue-800'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          すべて ({topics.reduce((sum, topic) => sum + topic.count, 0)})
        </button>

        {topics.map((topic) => (
          <button
            key={topic.name}
            onClick={() => onTopicSelect(topic.name)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
              selectedTopic === topic.name
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>{topic.name}</span>
            <span className="text-gray-500 text-xs">
              {topic.count}
            </span>
          </button>
        ))}
      </div>

      {topics.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-4">
          トピックが見つかりません
        </p>
      )}
    </div>
  )
}

export default TopicFilter