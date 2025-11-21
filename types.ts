

import React from 'react';

export interface SubTopic {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  demo: React.ComponentType;
}

export interface Module {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  topics: SubTopic[];
}

export interface FlashcardData {
  id:string;
  term: string;
  definition: string;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface ProgressContextType {
  completedTopics: string[];
  toggleTopicCompletion: (topicId: string) => void;
  isTopicCompleted: (topicId: string) => boolean;
}

// FIX: Add missing Theme, ThemeOption, and SettingsContextType types
export type Theme = 'theme-gold' | 'theme-cosmic' | 'theme-crimson' | 'theme-emerald' | 'theme-sapphire' | 'theme-amethyst' | 'theme-obsidian' | 'theme-sunstone';

export interface ThemeOption {
  value: Theme;
  label: string;
}

export interface SettingsContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}
