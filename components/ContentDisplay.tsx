
import React, { useState, useRef, useEffect } from 'react';
import type { SubTopic, FlashcardData, QuizQuestion, Difficulty } from '../types';
import { FLASHCARDS } from '../constants';
import GeminiTutor from './GeminiTutor';
import Flashcard from './Flashcard';
import { geminiService } from '../services/geminiService';
import { KnowledgeCheckIcon, SpeakerWaveIcon, StopCircleIcon, CheckCircleIcon } from './icons';
import { useProgress } from '../contexts/ProgressContext';

// --- Integrated Quiz Component ---
type QuizState = 'idle' | 'loading' | 'active';
const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

interface QuizProps {
  topicTitle: string;
}

const Quiz: React.FC<QuizProps> = ({ topicTitle }) => {
  const [quizState, setQuizState] = useState<QuizState>('idle');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Medium');

  const startQuiz = async () => {
    setQuizState('loading');
    setUserAnswers({});
    setScore(0);
    setQuestions([]);
    try {
      const quizQuestions = await geminiService.generateQuiz(topicTitle, selectedDifficulty);
      setQuestions(quizQuestions);
      setQuizState('active');
    } catch (error) {
      console.error(error);
      alert('Failed to generate the quiz. Please try again.');
      setQuizState('idle');
    }
  };

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    // Prevent changing answer after selection for immediate feedback mode
    if (userAnswers[questionIndex]) return;

    const isCorrect = option === questions[questionIndex].correctAnswer;
    
    setUserAnswers(prev => ({ ...prev, [questionIndex]: option }));
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const getOptionClass = (questionIndex: number, option: string) => {
    const userAnswer = userAnswers[questionIndex];
    
    // Not answered yet
    if (!userAnswer) {
        return 'bg-[var(--color-bg-surface)] border-[var(--color-border-base)] hover:bg-[var(--color-bg-surface-light)] hover:border-[var(--color-border-hover)] cursor-pointer text-[var(--color-text-muted)]';
    }

    const isCorrectAnswer = option === questions[questionIndex].correctAnswer;
    const isSelected = userAnswer === option;

    if (isCorrectAnswer) {
        return 'bg-green-500/20 border-green-500 text-[var(--color-text-heading)] shadow-[0_0_10px_rgba(34,197,94,0.2)]';
    }
    if (isSelected) {
        return 'bg-red-500/20 border-red-500 text-[var(--color-text-heading)]';
    }
    return 'bg-[var(--color-bg-surface-light)] border-[var(--color-border-base)] opacity-50 text-[var(--color-text-muted)]';
  };

  const renderContent = () => {
    switch(quizState) {
      case 'idle':
        return (
          <div className="text-center">
             <div className="mb-6">
              <p className="mb-3 text-[var(--color-text-muted)] font-semibold">Select Difficulty</p>
              <div className="flex justify-center gap-2">
                {DIFFICULTIES.map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDifficulty(d)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                      selectedDifficulty === d
                        ? 'bg-[var(--color-primary-accent)] text-black shadow-lg'
                        : 'bg-[var(--color-bg-surface-light)] hover:bg-opacity-80 text-[var(--color-text-base)]'
                    }`}
                     style={selectedDifficulty === d ? { boxShadow: `0 4px 15px var(--color-primary-accent-glow)` } : {}}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={startQuiz}
              className="px-6 py-3 bg-[var(--color-primary-accent)] text-black font-bold rounded-full hover:bg-[var(--color-primary-accent-light)] transition-transform transform hover:scale-105 shadow-lg"
              style={{ boxShadow: `0 8px 30px var(--color-primary-accent-glow)` }}
            >
              Start {selectedDifficulty} Quiz
            </button>
          </div>
        );

      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center p-8 bg-[var(--color-bg-surface-light)] rounded-lg">
            <svg className="animate-spin h-8 w-8 text-[var(--color-primary-accent)] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-[var(--color-text-muted)]">Generating your {selectedDifficulty} quiz...</p>
          </div>
        );

      case 'active':
        const allAnswered = questions.length > 0 && Object.keys(userAnswers).length === questions.length;
        
        return (
          <div>
            <div className="space-y-6">
              {questions.map((q, index) => (
                <div key={index} className="p-4 bg-[var(--color-bg-surface-light)] bg-opacity-50 rounded-lg border border-[var(--color-border-base)]">
                  <p className="font-semibold mb-3 text-[var(--color-text-heading)]">{index + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <button 
                        key={optIndex} 
                        onClick={() => handleAnswerSelect(index, option)}
                        disabled={!!userAnswers[index]}
                        className={`w-full flex items-center space-x-3 p-3 rounded-md border transition-all duration-200 text-left ${getOptionClass(index, option)}`}
                      >
                         {/* Simple circle indicator */}
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                            userAnswers[index] === option 
                                ? (option === q.correctAnswer ? 'border-green-500 bg-green-500' : 'border-red-500 bg-red-500')
                                : 'border-[var(--color-text-muted)]'
                        }`}>
                             {userAnswers[index] === option && (
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                             )}
                        </div>
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                  
                  {/* Immediate Feedback / Explanation */}
                  {userAnswers[index] && (
                      <div className={`mt-4 p-4 rounded-lg border animate-section-enter transition-colors duration-300 ${
                          userAnswers[index] === q.correctAnswer 
                            ? 'bg-green-900/20 border-green-500/30' 
                            : 'bg-red-900/20 border-red-500/30'
                      }`}>
                          <div className="flex items-center gap-2 mb-2">
                               {userAnswers[index] === q.correctAnswer ? (
                                  <CheckCircleIcon className="w-5 h-5 text-green-400" />
                               ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-400">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                                  </svg>
                               )}
                              <p className={`font-bold ${
                                  userAnswers[index] === q.correctAnswer ? 'text-green-400' : 'text-red-400'
                              }`}>
                                  {userAnswers[index] === q.correctAnswer ? 'Correct!' : 'Incorrect'}
                              </p>
                          </div>
                          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed pl-7">{q.explanation}</p>
                      </div>
                  )}
                </div>
              ))}
            </div>

            {allAnswered && (
                <div className="mt-8 p-6 bg-[var(--color-bg-surface-light)] rounded-xl border border-[var(--color-border-base)] text-center animate-section-enter">
                    <h3 className="text-2xl font-serif font-bold text-[var(--color-text-heading)] mb-2">Quiz Completed!</h3>
                    <p className="text-lg text-[var(--color-text-muted)] mb-6">
                        You scored <span className="font-bold text-[var(--color-primary-accent)]">{score}</span> out of <span className="font-bold">{questions.length}</span>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={startQuiz}
                            className="px-6 py-3 bg-[var(--color-primary-accent)] text-black font-semibold rounded-full hover:bg-[var(--color-primary-accent-light)] transition-transform transform hover:scale-105 shadow-lg"
                        >
                            Try {selectedDifficulty} Again
                        </button>
                        <button
                            onClick={() => setQuizState('idle')}
                            className="px-6 py-3 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-full border border-[var(--color-border-base)] hover:bg-[var(--color-bg-surface-light)] transition-colors"
                        >
                            Select New Topic/Difficulty
                        </button>
                    </div>
                </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>
};

// --- Main ContentDisplay Component ---
interface ContentDisplayProps {
  topic: SubTopic;
}

type NarrationState = 'idle' | 'loading' | 'playing' | 'error';

const ContentDisplay: React.FC<ContentDisplayProps> = ({ topic }) => {
  const DemoComponent = topic.demo;
  const relatedFlashcards = FLASHCARDS[topic.id] || [];
  const { isTopicCompleted, toggleTopicCompletion } = useProgress();

  const [narrationState, setNarrationState] = useState<NarrationState>('idle');
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Scroll to top and stop audio whenever the topic changes
  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
        audioSourceRef.current = null;
        setNarrationState('idle');
      }
    };
  }, [topic.id]);

  const handleNarration = async () => {
    // If it's already playing, stop it
    if (narrationState === 'playing' && audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
      setNarrationState('idle');
      return;
    }

    setNarrationState('loading');

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const audioContext = audioContextRef.current;
      
      const base64Audio = await geminiService.generateSpeech(topic.longDescription);
      if (!base64Audio) {
        throw new Error("Received empty audio from API.");
      }
      
      const audioBytes = geminiService.decode(base64Audio);
      const audioBuffer = await geminiService.decodeAudioData(audioBytes, audioContext, 24000, 1);
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();

      audioSourceRef.current = source;
      setNarrationState('playing');

      source.onended = () => {
        setNarrationState('idle');
        audioSourceRef.current = null;
      };

    } catch (error) {
      console.error("Narration failed:", error);
      setNarrationState('error');
    }
  };

  return (
    <main className="md:ml-64 pt-20 px-4 md:px-8 pb-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <section key={topic.id} className="animate-section-enter">
          <header className="mb-6">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-text-heading)] tracking-tight">{topic.title}</h1>
            <p className="mt-2 text-lg text-[var(--color-text-muted)]">{topic.description}</p>
          </header>

          <div 
            className="bg-[var(--color-bg-surface)] bg-opacity-60 border border-[var(--color-border-base)] rounded-2xl shadow-lg backdrop-blur-md p-6"
            style={{ boxShadow: `0 8px 30px var(--color-primary-accent-glow)` }}
          >
            <DemoComponent />
            <div className="mt-6 prose prose-stone max-w-none text-[var(--color-text-muted)] relative" style={{'--tw-prose-invert-body': 'var(--color-text-muted)'} as React.CSSProperties}>
              <button
                onClick={handleNarration}
                disabled={narrationState === 'loading'}
                className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[var(--color-bg-surface-light)] border border-[var(--color-border-base)] flex items-center justify-center hover:border-[var(--color-border-hover)] transition-colors disabled:opacity-50 disabled:cursor-wait"
                aria-label={narrationState === 'playing' ? 'Stop narration' : 'Read aloud'}
              >
                {narrationState === 'playing' ? (
                  <StopCircleIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <SpeakerWaveIcon className="w-6 h-6 text-[var(--color-primary-accent)]" />
                )}
              </button>
              {narrationState === 'loading' && <div className="absolute top-0 right-0 p-2 rounded-full"><svg className="animate-spin h-6 w-6 text-[var(--color-primary-accent)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>}
              {narrationState === 'error' && <p className="text-red-400 text-xs text-right -mb-4">Audio failed.</p>}
              
              <p>{topic.longDescription}</p>
            </div>
          </div>
        </section>

        <section className="animate-section-enter" style={{animationDelay: '150ms'}}>
          <GeminiTutor topicTitle={topic.title} />
        </section>

        <section 
            className="bg-[var(--color-bg-surface)] bg-opacity-60 border border-[var(--color-border-base)] rounded-2xl shadow-lg backdrop-blur-md p-6 animate-section-enter"
            style={{ animationDelay: '300ms', boxShadow: `0 8px 30px var(--color-primary-accent-glow)` }}
        >
            <h2 className="font-serif text-3xl font-bold mb-2 flex items-center text-[var(--color-text-heading)]">
                <KnowledgeCheckIcon className="w-8 h-8 mr-3 text-[var(--color-primary-accent)]"/>
                <span>Knowledge Check</span>
            </h2>
            <p className="text-[var(--color-text-muted)] mb-6">
                Test your understanding of {topic.title} with a short, AI-generated quiz.
            </p>
            <Quiz topicTitle={topic.title} />
        </section>

        {relatedFlashcards.length > 0 && (
          <section className="animate-section-enter" style={{animationDelay: '450ms'}}>
            <h2 className="font-serif text-3xl font-bold mb-4 text-[var(--color-text-heading)]">Key Term Flashcards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedFlashcards.map((card: FlashcardData) => (
                <Flashcard key={card.id} card={card} />
              ))}
            </div>
          </section>
        )}

        <section className="border-t border-[var(--color-border-base)] pt-6 text-center animate-section-enter" style={{animationDelay: '600ms'}}>
            <button
                onClick={() => toggleTopicCompletion(topic.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 mx-auto ${
                    isTopicCompleted(topic.id)
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-[var(--color-bg-surface-light)] text-[var(--color-text-muted)] hover:bg-opacity-80'
                }`}
            >
                <CheckCircleIcon className="w-5 h-5"/>
                <span>{isTopicCompleted(topic.id) ? 'Topic Completed!' : 'Mark as Complete'}</span>
            </button>
        </section>
      </div>
    </main>
  );
};

export default ContentDisplay;
