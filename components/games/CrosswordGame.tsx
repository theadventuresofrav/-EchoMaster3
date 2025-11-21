import React, { useState } from 'react';

// A simplified crossword: list of clues + inputs.
// A full grid implementation is complex, so we use a "fill in the blank" style puzzle
// that mimics the intellectual challenge.

const PUZZLE_DATA = [
    { id: 1, clue: "The number of pulses that occur in a single second (___ Repetition Frequency).", answer: "PULSE", user: "" },
    { id: 2, clue: "Unit of frequency equal to one cycle per second.", answer: "HERTZ", user: "" },
    { id: 3, clue: "The length of space that one cycle takes up.", answer: "WAVELENGTH", user: "" },
    { id: 4, clue: "Material placed on the back of the PZT to dampen vibrations.", answer: "BACKING", user: "" },
    { id: 5, clue: "Type of resolution improved by high frequency.", answer: "AXIAL", user: "" },
    { id: 6, clue: "Change in frequency due to motion.", answer: "DOPPLER", user: "" },
    { id: 7, clue: "Reduction in intensity as sound travels.", answer: "ATTENUATION", user: "" },
    { id: 8, clue: "Angle at which sound is totally reflected (___ Angle).", answer: "CRITICAL", user: "" }
];

const CrosswordGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [feedback, setFeedback] = useState<Record<number, boolean | null>>({}); // true=correct, false=wrong
    const [shakeIds, setShakeIds] = useState<number[]>([]);

    const handleChange = (id: number, val: string) => {
        setAnswers(prev => ({ ...prev, [id]: val.toUpperCase() }));
        setFeedback(prev => ({ ...prev, [id]: null })); // Reset feedback on edit
    };

    const handleCheck = () => {
        const newFeedback: Record<number, boolean> = {};
        const wrongs: number[] = [];
        PUZZLE_DATA.forEach(item => {
            const userVal = answers[item.id] || "";
            const correct = userVal === item.answer;
            newFeedback[item.id] = correct;
            if (!correct) wrongs.push(item.id);
        });
        setFeedback(newFeedback);
        
        if (wrongs.length > 0) {
            setShakeIds(wrongs);
            setTimeout(() => setShakeIds([]), 500); // Reset after animation duration
        }
    };

    const isAllCorrect = PUZZLE_DATA.every(item => feedback[item.id] === true);

    return (
        <div className="w-full h-full flex flex-col">
             <div className="flex justify-between items-center mb-6">
                 <button onClick={onExit} className="text-sm text-[var(--color-text-muted)] hover:text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Back to Games
                </button>
                <div className="text-xl font-bold text-[var(--color-primary-accent)]">
                    Physics Terminology Puzzle
                </div>
            </div>

            <div className="flex-grow overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PUZZLE_DATA.map((item, index) => {
                        const isCorrect = feedback[item.id] === true;
                        const isWrong = feedback[item.id] === false;
                        const shouldShake = shakeIds.includes(item.id);
                        
                        return (
                            <div 
                                key={item.id} 
                                className="bg-[var(--color-bg-surface-light)] p-4 rounded-lg border border-[var(--color-border-base)] animate-section-enter"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="text-sm text-[var(--color-text-muted)] mb-2">
                                    {item.id}. {item.clue}
                                </div>
                                <div className={`flex items-center gap-2 ${shouldShake ? 'animate-shake' : ''}`}>
                                    <div className="relative flex-grow">
                                        <input
                                            type="text"
                                            value={answers[item.id] || ''}
                                            onChange={(e) => handleChange(item.id, e.target.value)}
                                            maxLength={item.answer.length}
                                            className={`w-full bg-[var(--color-bg-surface)] border rounded px-3 py-2 font-mono tracking-widest uppercase focus:outline-none transition-colors duration-300 ${
                                                isCorrect ? 'border-green-500 text-green-400 bg-green-900/10' : 
                                                isWrong ? 'border-red-500 text-red-400 bg-red-900/10' : 
                                                'border-[var(--color-border-base)] text-white focus:border-[var(--color-primary-accent)]'
                                            }`}
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                                            {item.answer.length} letters
                                        </div>
                                    </div>
                                    {isCorrect && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500 animate-pop-in">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                {isAllCorrect ? (
                    <div className="text-green-400 font-bold text-xl animate-pulse">
                        🎉 Puzzle Completed! Great Job!
                    </div>
                ) : (
                    <button
                        onClick={handleCheck}
                        className="px-8 py-3 bg-[var(--color-primary-accent)] text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-[var(--color-primary-accent)]/20"
                    >
                        Check Answers
                    </button>
                )}
            </div>
        </div>
    );
};

export default CrosswordGame;