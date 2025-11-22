
import React from 'react';
import { StarIcon, GameControllerIcon, EyeIcon, BookOpenIcon } from './icons';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  onToggleSidebar: () => void;
  onNavigate: (view: 'topics' | 'numerology' | 'games' | 'demos' | 'plans') => void;
  currentView: 'topics' | 'numerology' | 'games' | 'demos' | 'plans';
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onNavigate, currentView }) => {
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[var(--color-bg-surface)]/80 backdrop-blur-md border-b border-[var(--color-border-base)] z-40 flex items-center px-4 md:px-6">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
            <button
              onClick={onToggleSidebar}
              className="p-1 rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface-light)] transition-colors md:hidden"
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <button onClick={() => onNavigate('topics')} className="flex items-center space-x-2" aria-label="Go to homepage">
                <h1 className="text-xl font-serif font-bold text-[var(--color-text-heading)] tracking-wider hidden sm:block">
                    ARDMS <span className="font-light text-[var(--color-primary-accent)]">SPI Review</span>
                </h1>
            </button>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          
          <button
            onClick={() => onNavigate('plans')}
            title="Study Plans"
            className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-all duration-300 transform hover:scale-105 ${
              currentView === 'plans'
                ? 'bg-[var(--color-primary-accent)] text-black shadow-lg'
                : 'bg-[var(--color-bg-surface-light)] text-[var(--color-text-base)] border-[var(--color-border-base)] hover:border-[var(--color-border-hover)]'
            }`}
            style={currentView === 'plans' ? { boxShadow: `0 4px 15px var(--color-primary-accent-glow)` } : {}}
          >
            <BookOpenIcon className="w-5 h-5" />
            <span className="text-sm hidden lg:inline">Plans</span>
          </button>

          <button
            onClick={() => onNavigate('demos')}
            title="Visual Lab"
            className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-all duration-300 transform hover:scale-105 ${
              currentView === 'demos'
                ? 'bg-[var(--color-primary-accent)] text-black shadow-lg'
                : 'bg-[var(--color-bg-surface-light)] text-[var(--color-text-base)] border-[var(--color-border-base)] hover:border-[var(--color-border-hover)]'
            }`}
            style={currentView === 'demos' ? { boxShadow: `0 4px 15px var(--color-primary-accent-glow)` } : {}}
          >
            <EyeIcon className="w-5 h-5" />
            <span className="text-sm hidden lg:inline">Visuals</span>
          </button>

          <button
            onClick={() => onNavigate('games')}
            title="Educational Games"
            className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-all duration-300 transform hover:scale-105 ${
              currentView === 'games'
                ? 'bg-[var(--color-primary-accent)] text-black shadow-lg'
                : 'bg-[var(--color-bg-surface-light)] text-[var(--color-text-base)] border-[var(--color-border-base)] hover:border-[var(--color-border-hover)]'
            }`}
            style={currentView === 'games' ? { boxShadow: `0 4px 15px var(--color-primary-accent-glow)` } : {}}
          >
            <GameControllerIcon className="w-5 h-5" />
            <span className="text-sm hidden lg:inline">Games</span>
          </button>

          <button
            onClick={() => onNavigate('numerology')}
            title="Premium Numerology Guide"
            className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-all duration-300 transform hover:scale-105 ${
              currentView === 'numerology'
                ? 'bg-[var(--color-primary-accent)] text-black shadow-lg'
                : 'bg-[var(--color-bg-surface-light)] text-[var(--color-text-base)] border-[var(--color-border-base)] hover:border-[var(--color-border-hover)]'
            }`}
            style={currentView === 'numerology' ? { boxShadow: `0 4px 15px var(--color-primary-accent-glow)` } : {}}
          >
            <StarIcon className="w-5 h-5" />
            <span className="text-sm hidden lg:inline">Premium Guide</span>
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
