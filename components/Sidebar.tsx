
import React, { useState, useMemo } from 'react';
import type { Module } from '../types';
import { useProgress } from '../contexts/ProgressContext';
import { CheckCircleIcon, SearchIcon, GameControllerIcon, EyeIcon, BookOpenIcon, StarIcon } from './icons';

interface SidebarProps {
  modules: Module[];
  selectedTopicId: string;
  onSelectTopic: (id: string) => void;
  isOpen: boolean;
  onNavigate: (view: 'topics' | 'numerology' | 'games' | 'demos' | 'plans') => void;
  currentView: 'topics' | 'numerology' | 'games' | 'demos' | 'plans';
}

const Sidebar: React.FC<SidebarProps> = ({ modules, selectedTopicId, onSelectTopic, isOpen, onNavigate, currentView }) => {
  const { isTopicCompleted } = useProgress();
  const [searchTerm, setSearchTerm] = useState('');

  // Determine which module contains the selected topic to keep it open
  const openModuleId = useMemo(() => {
    return modules.find(m => m.topics.some(t => t.id === selectedTopicId))?.id;
  }, [modules, selectedTopicId]);

  const filteredModules = useMemo(() => {
    if (!searchTerm.trim()) {
      return modules;
    }
    
    const lowercasedFilter = searchTerm.toLowerCase();

    return modules
      .map(module => {
        // If module title matches, include all its topics
        if (module.title.toLowerCase().includes(lowercasedFilter)) {
          return module;
        }
        // Otherwise, filter topics inside the module
        const filteredTopics = module.topics.filter(topic =>
          topic.title.toLowerCase().includes(lowercasedFilter) ||
          topic.description.toLowerCase().includes(lowercasedFilter)
        );
        // If any topics match, return the module with just those topics
        if (filteredTopics.length > 0) {
          return { ...module, topics: filteredTopics };
        }
        // Otherwise, this module doesn't match
        return null;
      })
      .filter((module): module is Module => module !== null);
  }, [modules, searchTerm]);


  return (
    <aside className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-surface-dark/70 backdrop-blur-lg border-r border-rich-gold/30 p-4 flex flex-col overflow-y-auto z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-primary-black/50 border border-rich-gold/30 rounded-full pl-10 pr-4 py-2 text-sm text-pure-white placeholder:text-silver focus:outline-none focus:ring-2 focus:ring-rich-gold"
        />
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
      </div>

      <nav className="flex-grow overflow-y-auto">
        {/* Special Sections */}
        <div className="mb-6 space-y-1">
            <div className="px-2 mb-2 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider opacity-70">
                Study Tools
            </div>
            <button
                onClick={() => onNavigate('plans')}
                className={`w-full flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors border-l-2 ${
                currentView === 'plans'
                    ? 'border-[var(--color-primary-accent)] bg-[var(--color-primary-accent)]/10 text-[var(--color-primary-accent)] font-bold'
                    : 'border-transparent text-silver hover:bg-primary-black/40 hover:text-pure-white hover:border-[var(--color-primary-accent)]/50'
                }`}
            >
                <BookOpenIcon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm tracking-wide">Study Plans</span>
            </button>

            <button
                onClick={() => onNavigate('games')}
                className={`w-full flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors border-l-2 ${
                currentView === 'games'
                    ? 'border-[var(--color-primary-accent)] bg-[var(--color-primary-accent)]/10 text-[var(--color-primary-accent)] font-bold'
                    : 'border-transparent text-silver hover:bg-primary-black/40 hover:text-pure-white hover:border-[var(--color-primary-accent)]/50'
                }`}
            >
                <GameControllerIcon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm tracking-wide">Learning Arcade</span>
            </button>

            <button
                onClick={() => onNavigate('demos')}
                className={`w-full flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors border-l-2 ${
                currentView === 'demos'
                    ? 'border-[var(--color-primary-accent)] bg-[var(--color-primary-accent)]/10 text-[var(--color-primary-accent)] font-bold'
                    : 'border-transparent text-silver hover:bg-primary-black/40 hover:text-pure-white hover:border-[var(--color-primary-accent)]/50'
                }`}
            >
                <EyeIcon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm tracking-wide">Visual Lab</span>
            </button>

             <button
                onClick={() => onNavigate('numerology')}
                className={`w-full flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors border-l-2 ${
                currentView === 'numerology'
                    ? 'border-[var(--color-primary-accent)] bg-[var(--color-primary-accent)]/10 text-[var(--color-primary-accent)] font-bold'
                    : 'border-transparent text-silver hover:bg-primary-black/40 hover:text-pure-white hover:border-[var(--color-primary-accent)]/50'
                }`}
            >
                <StarIcon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm tracking-wide">Premium Guide</span>
            </button>
        </div>

        {/* Modules */}
         <div className="px-2 mb-2 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider opacity-70">
            Course Curriculum
         </div>
         <div className="h-px bg-rich-gold/10 mx-2 mb-3"></div>

        <div className="flex flex-col space-y-1 pb-8">
            {filteredModules.map((module) => (
            <details key={module.id} open={searchTerm ? true : module.id === openModuleId} className="group">
                <summary className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-primary-black/40 list-none transition-colors select-none">
                    <div className="flex items-center space-x-3">
                        <module.icon className="w-5 h-5 text-rich-gold flex-shrink-0" />
                        <span className="text-sm font-semibold tracking-wide text-silver group-open:text-pure-white transition-colors">{module.title}</span>
                    </div>
                    <svg className="w-4 h-4 text-silver transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </summary>
                <ul className="pl-4 mt-1 border-l-2 border-rich-gold/30 space-y-1 animate-section-enter" style={{ animationDuration: '0.3s' }}>
                {module.topics.map((topic) => (
                    <li key={topic.id}>
                    <button
                        onClick={() => onSelectTopic(topic.id)}
                        className={`w-full text-left flex items-center justify-between pl-5 pr-2 py-2 rounded-r-md transition-all duration-200 text-sm border-l-2 ${
                        selectedTopicId === topic.id && currentView === 'topics'
                            ? 'border-rich-gold bg-rich-gold/10 text-rich-gold font-medium'
                            : 'border-transparent text-silver hover:bg-primary-black/40 hover:text-pure-white hover:border-rich-gold/50'
                        }`}
                    >
                        <span>{topic.title}</span>
                        {isTopicCompleted(topic.id) && (
                            <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        )}
                    </button>
                    </li>
                ))}
                </ul>
            </details>
            ))}
            {filteredModules.length === 0 && (
                <p className="p-4 text-center text-sm text-silver">No topics found.</p>
            )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
