import React, { useState, useRef, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import type { Theme, ThemeOption } from '../types';

const THEME_OPTIONS: ThemeOption[] = [
  { value: 'theme-gold', label: 'Celestial Gold' },
  { value: 'theme-cosmic', label: 'Cosmic Cyan' },
  { value: 'theme-crimson', label: 'Crimson Ember' },
  { value: 'theme-emerald', label: 'Emerald Serpent' },
  { value: 'theme-sapphire', label: 'Sapphire Scribe' },
  { value: 'theme-amethyst', label: 'Amethyst Oracle' },
  { value: 'theme-obsidian', label: 'Obsidian Shadow' },
  { value: 'theme-sunstone', label: 'Sunstone Ritual' },
];

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };
  
  const currentThemeLabel = THEME_OPTIONS.find(opt => opt.value === theme)?.label || 'Select Theme';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-full bg-[var(--color-bg-surface-light)] border border-[var(--color-border-base)] hover:border-[var(--color-border-hover)] transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
        <span className="text-sm text-[var(--color-text-base)] hidden sm:inline">{currentThemeLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[var(--color-bg-surface)] bg-opacity-80 backdrop-blur-md border border-[var(--color-border-base)] rounded-lg shadow-2xl z-50">
          <ul className="p-1">
            {THEME_OPTIONS.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleThemeChange(option.value)}
                  className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-[var(--color-bg-surface-light)] transition-colors text-[var(--color-text-base)]"
                >
                  <span>{option.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;