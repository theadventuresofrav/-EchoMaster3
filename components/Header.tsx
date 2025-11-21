
import React from 'react';
import { PodcastIcon, StarIcon, GameControllerIcon, EyeIcon, BookOpenIcon } from './icons';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  onToggleSidebar: () => void;
  onNavigate: (view: 'topics' | 'numerology' | 'games' | 'demos' | 'plans') => void;
  currentView: 'topics' | 'numerology' | 'games' | 'demos' | 'plans';
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onNavigate, currentView }) => {
  const podcastUrl = "https://www.podbean.com/player-v2/?i=7vbsd-10e390b-pbblog-playlist&share=1&download=1&fonts=Impact&skin=1b1b1b&font-color=ffffff&rtl=1&logo_link=episode_page&btn-skin=60a0c8&size=315";

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
                <svg className="w-8 h-8 text-[var(--color-primary-accent)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.125 0 1.131.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5m-7.5 0-1.125 1.125a1.5 1.5 0 0 0 0 2.121l1.125 1.125m-1.125-4.5h7.5m-7.5 0-1.125-1.125a1.5 1.5 0 0 1 0-2.121L8.25 2.25m-1.125 4.5-1.125 1.125a1.5 1.5 0 0 0 0 2.121l1.125 1.125m7.5-4.5h-7.5m-1.125-4.5 1.125-1.125a1.5 1.5 0 0 1 2.121 0l1.125 1.125m0 0 1.125 1.125a1.5 1.5 0 0 1 0 2.121l-1.125 1.125m0 0-1.125-1.125m12.375-3.375-1.125 1.125a1.5 1.5 0 0 1-2.121 0l-1.125-1.125m0 0-1.125-1.125a1.5 1.5 0 0 0-2.121 0L9.375 7.5m0 0-1.125 1.125a1.5 1.5 0 0 0 0 2.121l1.125 1.125M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h1 className="text-xl font-serif font-bold text-[var(--color-text-heading)] tracking-wider hidden sm:block">
                    ARDMS <span className="font-light text-[var(--color-primary-accent)]">SPI Review</span>
                </h1>
            </button>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <a
            href={podcastUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Listen to the Podcast"
            className="flex items-center space-x-2 px-3 py-2 rounded-full bg-[var(--color-bg-surface-light)] border border-[var(--color-border-base)] text-[var(--color-text-base)] hover:border-[var(--color-border-hover)] transition-colors"
          >
            <PodcastIcon className="w-5 h-5" />
            <span className="text-sm hidden lg:inline">Podcast</span>
          </a>

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
