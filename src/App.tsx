import React from 'react'
import { LearningMemo } from './types/memo'
import Timeline from './components/Timeline'
import TopicFilter from './components/TopicFilter'
import { useLearningMemos } from './hooks/useLearningMemos'

function App() {
  const { memos, topics, selectedTopic, setSelectedTopic } = useLearningMemos()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Manabi Map
          </h1>
          <p className="text-gray-600 mt-2">
            学びの軌跡を可視化し、知識の探索をサポートします
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <TopicFilter
              topics={topics}
              selectedTopic={selectedTopic}
              onTopicSelect={setSelectedTopic}
            />
          </aside>
          
          <section className="lg:col-span-3">
            <Timeline memos={memos} />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App