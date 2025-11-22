
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
        <div className="w-full max-w-7xl mx-auto h-full flex flex-col p-2 md:p-6 animate-section-enter">
            {/* Header Bar - Persistent and clean */}
            <div className="flex justify-between items-center mb-4 md:mb-8 bg-gray-900/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
                 <button onClick={onExit} className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors ring-1 ring-white/10 group-hover:ring-white/30">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                    <span className="hidden sm:inline font-bold tracking-wide">EXIT GAME</span>
                </button>
                
                <div className="flex flex-col items-end">
                     <div className="text-[10px] md:text-xs text-[var(--color-text-muted)] uppercase tracking-[0.2em] font-bold mb-1">Current Winnings</div>
                     <div className="text-2xl md:text-4xl font-black text-[var(--color-primary-accent)] font-mono drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] tracking-tighter">
                        ${score.toLocaleString()}
                     </div>
                </div>
            </div>
            
            {/* Game Board Container */}
            <div className="flex-grow overflow-y-auto pb-4 custom-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 min-w-0">
                    {GAME_DATA.map((category, catIndex) => (
                        <div key={catIndex} className="flex flex-col gap-2 md:gap-4 min-w-0">
                            {/* Category Header */}
                            <div className="bg-gradient-to-br from-[var(--color-primary-accent)] via-[#b8860b] to-[#8a6508] text-black font-black text-center py-1 px-1 rounded-lg md:rounded-xl text-[10px] md:text-sm uppercase tracking-widest h-16 md:h-24 flex items-center justify-center shadow-lg border-b-4 border-[#5c4305] transform transition-transform hover:scale-[1.02]">
                                <span className="line-clamp-3 px-1 leading-tight">{category.title}</span>
                            </div>
                            
                            {/* Questions Column */}
                            {category.questions.map((q, qIndex) => {
                                const isAnswered = answered[q.id];
                                return (
                                    <button
                                        key={q.id}
                                        disabled={isAnswered}
                                        onClick={() => handleQuestionClick(catIndex, qIndex)}
                                        className={`
                                            relative h-20 md:h-28 flex items-center justify-center rounded-lg md:rounded-xl border-2 transition-all duration-300 overflow-hidden group
                                            ${isAnswered 
                                                ? 'bg-gray-900/30 border-gray-800 cursor-not-allowed opacity-40 grayscale' 
                                                : 'bg-blue-900/20 border-blue-500/30 hover:border-[var(--color-primary-accent)] hover:bg-blue-800/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] cursor-pointer hover:-translate-y-1'
                                            }
                                        `}
                                    >
                                        {/* Screen Glare/Scanline Effect */}
                                        {!isAnswered && (
                                            <>
                                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            </>
                                        )}

                                        {isAnswered ? (
                                            <span className="text-gray-600 font-mono text-xl md:text-2xl select-none font-bold">---</span>
                                        ) : (
                                            <span className="text-2xl md:text-4xl font-bold text-[var(--color-primary-accent)] font-mono drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                ${q.value}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Question Modal Overlay */}
            {activeQuestion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-section-enter">
                    <div className="w-full max-w-4xl bg-[#0a0a1f] rounded-3xl border-2 border-[var(--color-primary-accent)] shadow-[0_0_100px_rgba(var(--color-primary-accent-rgb),0.2)] overflow-hidden flex flex-col max-h-[90vh] relative">
                         
                         {/* Close Button (Top Right) */}
                         <button onClick={() => setActiveQuestion(null)} className="absolute top-4 right-4 z-10 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                         </button>

                         {/* Modal Header Strip */}
                         <div className="bg-gradient-to-r from-[#b8860b] via-[var(--color-primary-accent)] to-[#b8860b] p-3 md:p-4 flex justify-center items-center shadow-lg relative z-0">
                             <div className="text-black font-black font-mono text-lg md:text-2xl tracking-widest uppercase">
                                 {GAME_DATA[activeQuestion.catIndex].title} • ${GAME_DATA[activeQuestion.catIndex].questions[activeQuestion.qIndex].value}
                             </div>
                         </div>

                         <div className="p-6 md:p-12 flex flex-col items-center text-center overflow-y-auto flex-grow justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                             <div className="text-xl md:text-4xl font-serif font-bold text-white leading-relaxed mb-12 drop-shadow-md max-w-3xl mx-auto">
                                 "{GAME_DATA[activeQuestion.catIndex].questions[activeQuestion.qIndex].question}"
                             </div>

                             {!showAnswer ? (
                                 <button 
                                    onClick={handleReveal}
                                    className="group relative px-10 py-5 bg-[var(--color-primary-accent)] text-black font-black rounded-full text-xl tracking-wide hover:scale-105 transition-transform shadow-[0_0_30px_var(--color-primary-accent-glow)] overflow-hidden"
                                 >
                                     <span className="relative z-10 flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        REVEAL ANSWER
                                     </span>
                                     <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                 </button>
                             ) : (
                                 <div className="w-full animate-pop-in flex flex-col items-center">
                                     <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 mb-8 border border-[var(--color-primary-accent)]/30 shadow-2xl w-full max-w-2xl">
                                         <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-[0.3em] font-bold mb-4">Correct Response</p>
                                         <div className="text-2xl md:text-4xl text-[var(--color-primary-accent)] font-black font-mono tracking-tight">
                                             {GAME_DATA[activeQuestion.catIndex].questions[activeQuestion.qIndex].answer}
                                         </div>
                                     </div>
                                     
                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mx-auto">
                                         <button 
                                            onClick={() => handleComplete(true)}
                                            className="flex flex-col items-center justify-center gap-1 px-6 py-4 bg-green-600/20 border-2 border-green-500 text-green-400 font-bold rounded-2xl hover:bg-green-600 hover:text-white transition-all hover:scale-105 active:scale-95"
                                         >
                                             <span className="text-lg">I GOT IT RIGHT</span>
                                             <span className="text-xs opacity-80 font-mono">(${GAME_DATA[activeQuestion.catIndex].questions[activeQuestion.qIndex].value})</span>
                                         </button>
                                         <button 
                                            onClick={() => handleComplete(false)}
                                            className="flex flex-col items-center justify-center gap-1 px-6 py-4 bg-red-600/20 border-2 border-red-500 text-red-400 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all hover:scale-105 active:scale-95"
                                         >
                                             <span className="text-lg">I MISSED IT</span>
                                             <span className="text-xs opacity-80 font-mono">(-${GAME_DATA[activeQuestion.catIndex].questions[activeQuestion.qIndex].value})</span>
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
