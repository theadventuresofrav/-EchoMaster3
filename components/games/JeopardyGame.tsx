
import React, { useState } from 'react';

type QuestionState = 'unanswered' | 'answered';

interface JeopardyQuestion {
    id: string;
    value: number;
    question: string;
    answer: string;
}

interface JeopardyCategory {
    title: string;
    questions: JeopardyQuestion[];
}

const GAME_DATA: JeopardyCategory[] = [
    {
        title: "Sound Waves",
        questions: [
            { id: "w100", value: 100, question: "Sound requires this to propagate.", answer: "What is a Medium?" },
            { id: "w200", value: 200, question: "The number of cycles per second.", answer: "What is Frequency?" },
            { id: "w300", value: 300, question: "Sound with a frequency greater than 20,000 Hz.", answer: "What is Ultrasound?" },
        ]
    },
    {
        title: "Transducers",
        questions: [
            { id: "t100", value: 100, question: "The active element in a transducer.", answer: "What is the PZT (Piezoelectric Crystal)?" },
            { id: "t200", value: 200, question: "This component reduces the ringing of the crystal.", answer: "What is Backing Material?" },
            { id: "t300", value: 300, question: "The temperature at which PZT loses its polarization.", answer: "What is the Curie Point?" },
        ]
    },
    {
        title: "Doppler",
        questions: [
            { id: "d100", value: 100, question: "Doppler shift is the difference between transmitted and ______ frequencies.", answer: "What is Reflected (or Received)?" },
            { id: "d200", value: 200, question: "The optimal angle for Doppler shift measurement.", answer: "What is 0 degrees?" },
            { id: "d300", value: 300, question: "The artifact occurring when the Nyquist limit is exceeded.", answer: "What is Aliasing?" },
        ]
    },
    {
        title: "Artifacts",
        questions: [
            { id: "a100", value: 100, question: "An artifact seen as a signal void behind a stone.", answer: "What is Shadowing?" },
            { id: "a200", value: 200, question: "The duplication of a structure on the other side of a strong reflector.", answer: "What is Mirror Image?" },
            { id: "a300", value: 300, question: "Multiple, equally spaced echoes caused by sound bouncing between reflectors.", answer: "What is Reverberation?" },
        ]
    }
];

const JeopardyGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState<Record<string, boolean>>({});
    const [activeQuestion, setActiveQuestion] = useState<{catIndex: number, qIndex: number} | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleQuestionClick = (catIndex: number, qIndex: number) => {
        const qId = GAME_DATA[catIndex].questions[qIndex].id;
        if (!answered[qId]) {
            setActiveQuestion({ catIndex, qIndex });
            setShowAnswer(false);
        }
    };

    const handleReveal = () => {
        setShowAnswer(true);
    };

    const handleComplete = (correct: boolean) => {
        if (activeQuestion) {
            const { catIndex, qIndex } = activeQuestion;
            const q = GAME_DATA[catIndex].questions[qIndex];
            
            if (correct) {
                setScore(prev => prev + q.value);
            } else {
                setScore(prev => prev - q.value);
            }

            setAnswered(prev => ({ ...prev, [q.id]: true }));
            setActiveQuestion(null);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col p-2 md:p-4 animate-section-enter">
            {/* Header Bar */}
            <div className="flex justify-between items-center mb-6 bg-gray-900/60 p-4 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
                 <button onClick={onExit} className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                    <span className="hidden sm:inline">Exit Game</span>
                </button>
                
                <div className="flex flex-col items-end">
                     <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-bold">Current Score</div>
                     <div className="text-3xl font-bold text-[var(--color-primary-accent)] font-mono drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                        ${score}
                     </div>
                </div>
            </div>
            
            {/* Game Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 flex-grow overflow-y-auto pb-4">
                {GAME_DATA.map((category, catIndex) => (
                    <div key={catIndex} className="flex flex-col gap-3">
                        {/* Category Header */}
                        <div className="bg-gradient-to-b from-[var(--color-primary-accent)] to-[#b8860b] text-black font-bold text-center py-2 px-1 rounded-lg text-xs md:text-sm uppercase tracking-wider h-20 md:h-24 flex items-center justify-center shadow-lg border-b-4 border-[#8a6508]">
                            <span className="line-clamp-3">{category.title}</span>
                        </div>
                        
                        {/* Questions */}
                        {category.questions.map((q, qIndex) => {
                            const isAnswered = answered[q.id];
                            return (
                                <button
                                    key={q.id}
                                    disabled={isAnswered}
                                    onClick={() => handleQuestionClick(catIndex, qIndex)}
                                    className={`
                                        relative h-20 md:h-24 flex items-center justify-center rounded-lg border-2 transition-all duration-300 overflow-hidden group
                                        ${isAnswered 
                                            ? 'bg-gray-900/50 border-gray-800 cursor-default opacity-50' 
                                            : 'bg-blue-900/30 border-blue-500/30 hover:border-[var(--color-primary-accent)] hover:bg-blue-800/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] cursor-pointer'
                                        }
                                    `}
                                >
                                    {/* Background Glint Effect */}
                                    {!isAnswered && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}

                                    {isAnswered ? (
                                        <span className="text-gray-600 font-mono text-xl select-none">-</span>
                                    ) : (
                                        <span className="text-2xl md:text-3xl font-bold text-[var(--color-primary-accent)] font-mono drop-shadow-md group-hover:scale-110 transition-transform">
                                            ${q.value}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Question Modal */}
            {activeQuestion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-section-enter">
                    <div className="w-full max-w-3xl bg-[#0a0a1f] rounded-2xl border-2 border-[var(--color-primary-accent)] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
                         
                         {/* Modal Header */}
                         <div className="bg-[var(--color-primary-accent)] p-4 flex justify-between items-center">
                             <div className="text-black font-bold font-mono text-xl">
                                 {GAME_DATA[activeQuestion.catIndex].title} for ${GAME_DATA[activeQuestion.catIndex].questions[activeQuestion.qIndex].value}
                             </div>
                             <button onClick={() => setActiveQuestion(null)} className="text-black hover:bg-black/10 rounded-full p-1 transition-colors">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                             </button>
                         </div>

                         <div className="p-8 md:p-12 flex flex-col items-center text-center overflow-y-auto flex-grow">
                             <div className="text-2xl md:text-4xl font-serif font-bold text-white leading-relaxed mb-12">
                                 {GAME_DATA[activeQuestion.catIndex].questions[activeQuestion.qIndex].question}
                             </div>

                             {!showAnswer ? (
                                 <button 
                                    onClick={handleReveal}
                                    className="group relative px-8 py-4 bg-[var(--color-primary-accent)] text-black font-bold rounded-full text-lg hover:scale-105 transition-transform shadow-[0_0_20px_var(--color-primary-accent-glow)]"
                                 >
                                     <span className="relative z-10">Show Answer</span>
                                     <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 </button>
                             ) : (
                                 <div className="w-full animate-pop-in">
                                     <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-white/10">
                                         <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Correct Response</p>
                                         <div className="text-xl md:text-3xl text-[var(--color-primary-accent)] font-bold font-mono">
                                             {GAME_DATA[activeQuestion.catIndex].questions[activeQuestion.qIndex].answer}
                                         </div>
                                     </div>
                                     
                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mx-auto">
                                         <button 
                                            onClick={() => handleComplete(true)}
                                            className="flex items-center justify-center gap-2 px-6 py-4 bg-green-600/20 border border-green-500 text-green-400 font-bold rounded-xl hover:bg-green-600 hover:text-white transition-all"
                                         >
                                             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                                             Correct (+${GAME_DATA[activeQuestion.catIndex].questions[activeQuestion.qIndex].value})
                                         </button>
                                         <button 
                                            onClick={() => handleComplete(false)}
                                            className="flex items-center justify-center gap-2 px-6 py-4 bg-red-600/20 border border-red-500 text-red-400 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all"
                                         >
                                             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                                             Incorrect (-${GAME_DATA[activeQuestion.catIndex].questions[activeQuestion.qIndex].value})
                                         </button>
                                     </div>
                                 </div>
                             )}
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JeopardyGame;
