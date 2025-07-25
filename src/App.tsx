import Timeline from './components/Timeline'
import TopicFilter from './components/TopicFilter'
import SerendipityCard from './components/SerendipityCard'
import { useLearningMemos } from './hooks/useLearningMemos'
import { useSerendipity } from './hooks/useSerendipity'
import { useSRS } from './hooks/useSRS'

function App() {
  const { memos, allMemos, topics, selectedTopic, setSelectedTopic, setMemos } = useLearningMemos()
  const { currentResult, selectedMode, shuffleMemo, changeMode } = useSerendipity(allMemos)
  const { toggleImportant } = useSRS(allMemos, setMemos)

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
          
          <section className="lg:col-span-3 space-y-6">
            <SerendipityCard
              result={currentResult}
              selectedMode={selectedMode}
              onShuffle={shuffleMemo}
              onModeChange={changeMode}
            />
            
            <Timeline 
              memos={memos} 
              onToggleImportant={toggleImportant}
            />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App