
import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import type { ProgressContextType } from '../types';

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'echomasters_progress';

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  // Load progress from localStorage on initial mount
  useEffect(() => {
    try {
      const savedProgress = window.localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        setCompletedTopics(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTopics));
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  }, [completedTopics]);

  const toggleTopicCompletion = useCallback((topicId: string) => {
    setCompletedTopics(prev => {
      const isCompleted = prev.includes(topicId);
      if (isCompleted) {
        return prev.filter(id => id !== topicId); // Mark as incomplete
      } else {
        return [...prev, topicId]; // Mark as complete
      }
    });
  }, []);

  const isTopicCompleted = useCallback((topicId: string) => {
    return completedTopics.includes(topicId);
  }, [completedTopics]);

  const value = useMemo(() => ({
    completedTopics,
    toggleTopicCompletion,
    isTopicCompleted
  }), [completedTopics, toggleTopicCompletion, isTopicCompleted]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
