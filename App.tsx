
import React, { useState } from 'react';
import { SettingsProvider } from './contexts/SettingsContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ContentDisplay from './components/ContentDisplay';
import { MODULES } from './constants';
import type { SubTopic } from './types';
import NumerologyGuide from './components/demos/NumerologyGuide';
import GamesDashboard from './components/GamesDashboard';
import DemosDashboard from './components/DemosDashboard';
import StudyPlanGenerator from './components/study/StudyPlanGenerator';

// Flatten topics for easy lookup, while preserving the module structure for the sidebar
const ALL_TOPICS: SubTopic[] = MODULES.flatMap(m => m.topics);

function App() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(ALL_TOPICS[0].id);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'topics' | 'numerology' | 'games' | 'demos' | 'plans'>('topics');

  const selectedTopic = ALL_TOPICS.find(t => t.id === selectedTopicId) as SubTopic;

  const handleSelectTopic = (topicId: string) => {
    window.scrollTo(0, 0);
    setSelectedTopicId(topicId);
    setCurrentView('topics'); // Ensure view is set to topics
    setIsMobileSidebarOpen(false); // Close sidebar on topic selection
  };

  const handleNavigate = (view: 'topics' | 'numerology' | 'games' | 'demos' | 'plans') => {
    window.scrollTo(0, 0);
    setCurrentView(view);
    // If navigating to topics and no topic is selected, select the first one.
    if (view === 'topics' && !selectedTopicId) {
      setSelectedTopicId(ALL_TOPICS[0].id);
    }
    setIsMobileSidebarOpen(false); // Also close sidebar when navigating via sidebar buttons
  };

  const renderMainContent = () => {
      if (currentView === 'plans') {
          return (
              <main className="md:ml-64 pt-20 px-4 md:px-8 pb-8 min-h-screen">
                  <StudyPlanGenerator />
              </main>
          );
      }

      if (currentView === 'demos') {
          return <DemosDashboard />;
      }

      if (currentView === 'games') {
          return <GamesDashboard />;
      }
      
      if (currentView === 'numerology') {
          return (
            <main className="md:ml-64 pt-20 px-4 md:px-8 pb-8">
              <div className="max-w-5xl mx-auto space-y-12">
                <section className="animate-section-enter">
                  <header className="mb-6">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-text-heading)] tracking-tight">Premium Numerology Guide</h1>
                    <p className="mt-2 text-lg text-[var(--color-text-muted)]">An exclusive guide to advanced numerology concepts and systems.</p>
                  </header>
                  <div 
                    className="bg-[var(--color-bg-surface)] bg-opacity-60 border border-[var(--color-border-base)] rounded-2xl shadow-lg backdrop-blur-md p-6 sm:p-8"
                    style={{ boxShadow: `0 8px 30px var(--color-primary-accent-glow)` }}
                  >
                    <NumerologyGuide />
                  </div>
                </section>
              </div>
            </main>
          );
      }

      return <ContentDisplay topic={selectedTopic} onSelectTopic={handleSelectTopic} />;
  };

  return (
    <SettingsProvider>
      <ProgressProvider>
        <div className="min-h-screen">
          <Header 
            onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
            onNavigate={handleNavigate}
            currentView={currentView}
          />
          <Sidebar
            modules={MODULES}
            selectedTopicId={selectedTopicId}
            onSelectTopic={handleSelectTopic}
            onNavigate={handleNavigate}
            currentView={currentView}
            isOpen={isMobileSidebarOpen}
          />
           {isMobileSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-30 md:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
              aria-hidden="true"
            ></div>
          )}
          
          {renderMainContent()}

        </div>
      </ProgressProvider>
    </SettingsProvider>
  );
}

export default App;
