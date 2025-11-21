import React, { useState, useEffect, useMemo } from 'react';

const BINGO_TERMS = [
    "Frequency", "Period", "Wavelength", "Propagation Speed", "Amplitude",
    "Power", "Intensity", "Impedance", "Reflection", "Refraction",
    "Snell's Law", "PZT", "Curie Point", "Matching Layer", "Backing Material",
    "Bandwidth", "Q-Factor", "Near Zone", "Focal Zone", "Far Zone",
    "Axial Resolution", "Lateral Resolution", "A-Mode", "B-Mode", "M-Mode",
    "Pixel", "Bit", "Read Zoom", "Write Zoom", "Dynamic Range"
];

const BingoGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const [card, setCard] = useState<string[]>([]);
    const [marked, setMarked] = useState<boolean[]>([]);
    const [currentCall, setCurrentCall] = useState<string | null>(null);
    const [callHistory, setCallHistory] = useState<string[]>([]);
    const [hasBingo, setHasBingo] = useState(false);
    const [gameActive, setGameActive] = useState(false);
    const [animateCall, setAnimateCall] = useState(false);

    // Initialize card on mount
    useEffect(() => {
        generateCard();
    }, []);

    // Trigger animation on currentCall change
    useEffect(() => {
        if (currentCall) {
            setAnimateCall(true);
            const timer = setTimeout(() => setAnimateCall(false), 500);
            return () => clearTimeout(timer);
        }
    }, [currentCall]);

    const generateCard = () => {
        const shuffled = [...BINGO_TERMS].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 25); // 5x5 grid
        selected[12] = "FREE SPACE"; // Center
        setCard(selected);
        const newMarked = new Array(25).fill(false);
        newMarked[12] = true;
        setMarked(newMarked);
        setHasBingo(false);
        setCallHistory([]);
        setCurrentCall(null);
        setGameActive(false);
    };

    const startGame = () => {
        setGameActive(true);
        nextCall();
    };

    const nextCall = () => {
        if (callHistory.length >= BINGO_TERMS.length) return;
        
        let term;
        do {
            term = BINGO_TERMS[Math.floor(Math.random() * BINGO_TERMS.length)];
        } while (callHistory.includes(term) && callHistory.length < BINGO_TERMS.length);

        setCurrentCall(term);
        setCallHistory(prev => [...prev, term]);
    };

    const handleCellClick = (index: number) => {
        if (index === 12) return; // Free space always marked
        
        // Only allow marking if term has been called (optional rule, but good for solo play validation)
        // For this solo version, we allow marking if it matches current call or history, or just let them mark freely (simple).
        // Let's allow free marking but validate win.
        
        const newMarked = [...marked];
        newMarked[index] = !newMarked[index];
        setMarked(newMarked);
        checkForBingo(newMarked);
    };

    const checkForBingo = (currentMarked: boolean[]) => {
        const lines = [
            // Rows
            [0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [15,16,17,18,19], [20,21,22,23,24],
            // Cols
            [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24],
            // Diags
            [0,6,12,18,24], [4,8,12,16,20]
        ];

        for (const line of lines) {
            if (line.every(idx => currentMarked[idx])) {
                setHasBingo(true);
                setGameActive(false);
                return;
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center">
             <div className="w-full flex justify-between items-center mb-4">
                 <button onClick={onExit} className="text-sm text-[var(--color-text-muted)] hover:text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Back to Games
                </button>
                 <button onClick={generateCard} className="text-sm text-[var(--color-primary-accent)] border border-[var(--color-primary-accent)] px-3 py-1 rounded hover:bg-[var(--color-primary-accent)] hover:text-black transition-colors">
                    New Card
                </button>
            </div>

            {/* Call Display */}
            <div className="w-full max-w-md bg-[var(--color-bg-surface-light)] border border-[var(--color-border-base)] p-4 rounded-lg mb-6 text-center">
                {!gameActive && !hasBingo ? (
                    <button onClick={startGame} className="px-6 py-2 bg-[var(--color-primary-accent)] text-black font-bold rounded-full animate-pulse">
                        Start Game
                    </button>
                ) : hasBingo ? (
                    <div className="text-2xl font-bold text-[var(--color-primary-accent)] animate-bounce">
                        BINGO! YOU WIN!
                    </div>
                ) : (
                    <div>
                        <p className="text-[var(--color-text-muted)] text-sm mb-1">Current Call:</p>
                        <h2 className={`text-3xl font-bold text-white mb-4 ${animateCall ? 'animate-pop-in' : ''}`}>{currentCall}</h2>
                        <button onClick={nextCall} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 text-sm">
                            Next Call
                        </button>
                    </div>
                )}
            </div>

            {/* Bingo Grid */}
            <div className="grid grid-cols-5 gap-1 md:gap-2 max-w-lg w-full bg-[var(--color-border-base)] p-1 md:p-2 rounded-lg">
                {card.map((term, i) => (
                    <button
                        key={i}
                        onClick={() => handleCellClick(i)}
                        className={`aspect-square flex items-center justify-center text-[10px] md:text-xs text-center p-1 rounded transition-all duration-200 leading-tight ${
                            marked[i] 
                            ? 'bg-[var(--color-primary-accent)] text-black font-bold scale-95 shadow-inner' 
                            : 'bg-[var(--color-bg-surface)] text-white hover:bg-[var(--color-bg-surface-light)] hover:scale-105'
                        } ${i === 12 ? 'font-bold bg-gray-700' : ''}`}
                    >
                        {term}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BingoGame;