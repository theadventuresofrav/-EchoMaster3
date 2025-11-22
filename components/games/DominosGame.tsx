
import React, { useState, useEffect } from 'react';

// A simplified domino game: "Chain Reaction"
// Players match a Term to its Definition.
// Each tile has [Left Side | Right Side].
// The goal is to place all tiles from your hand onto the board.

interface Tile {
    id: number;
    left: string;
    right: string;
    matchedLeft: boolean; // visual state
    matchedRight: boolean; // visual state
}

const CONCEPTS = [
    { term: "Frequency", def: "Cycles/Sec" },
    { term: "Period", def: "Time/Cycle" },
    { term: "Wavelength", def: "Distance" },
    { term: "PZT", def: "Crystal" },
    { term: "Atten.", def: "Weakening" },
    { term: "Shadow", def: "Darkness" },
    { term: "Gain", def: "Amp." }
];

const DominosGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const [board, setBoard] = useState<Tile[]>([]);
    const [hand, setHand] = useState<Tile[]>([]);
    const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
    const [message, setMessage] = useState("Select a tile from your hand to start.");

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        // Create domino tiles where Right of one matches Left of another?
        // Let's make mixed tiles.
        // Tile 1: [Term A | Def B]
        // Tile 2: [Term B | Def C]
        // This creates a natural chain.
        
        const tiles: Tile[] = [];
        const shuffledConcepts = [...CONCEPTS].sort(() => 0.5 - Math.random());
        
        for (let i = 0; i < shuffledConcepts.length; i++) {
            const current = shuffledConcepts[i];
            const next = shuffledConcepts[(i + 1) % shuffledConcepts.length];
            
            // Create a tile linking current Term to next Def (or mixed)
            // To make it playable, we need a closed loop or linear chain logic.
            // Let's simply allow Term-Def matching.
            // Tile structure: [Content A | Content B]
            
            // We will build a perfect chain first, then shuffle and distribute.
            // Chain: [Start|Term A] -> [Def A|Term B] -> [Def B|Term C] ...
            
            // Actually, standard dominos match exact values (6|6 matches 6|4).
            // Our "values" are pairs of Term/Def.
            // Let's map each concept to an ID.
            // Tile X: [Right side of Prev | Left side of Next]
            
            // Let's keep it simple:
            // Tile: [Left Text | Right Text]
            // Connection: Left Text must match (be the pair of) the exposed Right Text on board.
        }

        // Simplified generation for prototype:
        // Chain: A -> A_pair | B -> B_pair | C ...
        // Tile 0: [ "START" | "Frequency" ]
        // Tile 1: [ "Cycles/Sec" | "Wavelength" ]
        // Tile 2: [ "Distance" | "PZT" ]
        // ...
        
        const chain: Tile[] = [];
        chain.push({ id: 0, left: "START", right: shuffledConcepts[0].term, matchedLeft: false, matchedRight: false });
        
        for (let i = 0; i < shuffledConcepts.length - 1; i++) {
            chain.push({
                id: i + 1,
                left: shuffledConcepts[i].def,
                right: shuffledConcepts[i+1].term,
                matchedLeft: false,
                matchedRight: false
            });
        }
        
        // Final tile closes or ends
        chain.push({
            id: 99,
            left: shuffledConcepts[shuffledConcepts.length - 1].def,
            right: "END",
            matchedLeft: false,
            matchedRight: false
        });

        // Place first tile on board
        setBoard([chain[0]]);
        
        // Shuffle rest into hand
        const rest = chain.slice(1).sort(() => 0.5 - Math.random());
        setHand(rest);
        setMessage("Match the Definition (Left) to the Term (Right) on the board.");
    };

    const handleHandClick = (index: number) => {
        if (selectedTileIndex === index) {
            setSelectedTileIndex(null);
        } else {
            setSelectedTileIndex(index);
        }
    };

    const handleBoardClick = () => {
        if (selectedTileIndex === null) return;
        
        const tileToPlay = hand[selectedTileIndex];
        const lastBoardTile = board[board.length - 1];
        
        // Check logic: Does tileToPlay.left (Def) match lastBoardTile.right (Term)?
        // Or are we matching a Term to a Definition?
        // Our chain logic: [ ... | Term ]  +  [ Def | ... ]
        // So we check if tileToPlay.left is the definition of lastBoardTile.right
        
        const term = lastBoardTile.right;
        const def = tileToPlay.left;
        
        // Find concept for the term
        const concept = CONCEPTS.find(c => c.term === term);
        
        if (concept && concept.def === def) {
            // Valid match
            const newBoard = [...board, tileToPlay];
            const newHand = hand.filter((_, i) => i !== selectedTileIndex);
            setBoard(newBoard);
            setHand(newHand);
            setSelectedTileIndex(null);
            setMessage("Correct match!");
            
            if (newHand.length === 0) {
                setMessage("🎉 BOARD CLEAR! YOU WIN!");
            }
        } else {
            setMessage("❌ Invalid match. Try again.");
            setTimeout(() => setMessage("Match the Definition (Left) to the Term (Right) on the board."), 1500);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-4 animate-section-enter">
             <div className="w-full max-w-5xl flex justify-between items-center mb-6">
                 <button onClick={onExit} className="text-sm text-[var(--color-text-muted)] hover:text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Back
                </button>
                <div className="text-xl font-bold text-[var(--color-primary-accent)]">
                    Physics Chain Reaction
                </div>
                 <button onClick={initializeGame} className="text-sm border border-[var(--color-border-base)] px-3 py-1 rounded hover:bg-[var(--color-bg-surface-light)] transition-colors">
                    Restart
                </button>
            </div>

            <div className="text-center mb-4 text-[var(--color-text-muted)] font-mono text-sm h-6">
                {message}
            </div>

            {/* Board Area */}
            <div className="w-full max-w-6xl flex-grow bg-[var(--color-bg-surface-light)] border-2 border-[var(--color-border-base)] rounded-xl p-8 mb-6 overflow-x-auto flex items-center gap-1 shadow-inner min-h-[160px]">
                {board.map((tile, i) => (
                    <div key={tile.id} className="flex-shrink-0 flex animate-pop-in">
                        <div className="w-24 h-16 bg-gray-800 border-2 border-gray-600 rounded-l-lg flex items-center justify-center p-1 text-center text-xs font-bold text-gray-300">
                            {tile.left}
                        </div>
                        <div className="w-px h-16 bg-black"></div>
                        <div className="w-24 h-16 bg-gray-800 border-2 border-l-0 border-gray-600 rounded-r-lg flex items-center justify-center p-1 text-center text-xs font-bold text-[var(--color-primary-accent)]">
                            {tile.right}
                        </div>
                        {/* Connector Line */}
                        {i < board.length - 1 && (
                            <div className="w-4 h-1 bg-green-500 self-center"></div>
                        )}
                    </div>
                ))}
                
                {/* Drop Zone Hint */}
                {hand.length > 0 && (
                    <button 
                        onClick={handleBoardClick}
                        className={`ml-4 w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center transition-all ${
                            selectedTileIndex !== null 
                            ? 'border-green-500 bg-green-500/10 animate-pulse scale-110 cursor-pointer' 
                            : 'border-gray-700 opacity-50'
                        }`}
                    >
                        <span className="text-2xl text-gray-500">+</span>
                    </button>
                )}
            </div>

            {/* Player Hand */}
            <div className="w-full max-w-6xl">
                <p className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Your Hand</p>
                <div className="flex flex-wrap gap-4 justify-center">
                    {hand.map((tile, i) => (
                        <button
                            key={tile.id}
                            onClick={() => handleHandClick(i)}
                            className={`flex transition-transform hover:-translate-y-1 ${selectedTileIndex === i ? 'ring-2 ring-[var(--color-primary-accent)] scale-105' : ''}`}
                        >
                            <div className="w-20 h-14 bg-[var(--color-bg-surface)] border border-[var(--color-border-base)] rounded-l-md flex items-center justify-center p-1 text-center text-[10px] font-bold text-gray-300">
                                {tile.left}
                            </div>
                            <div className="w-px h-14 bg-black"></div>
                            <div className="w-20 h-14 bg-[var(--color-bg-surface)] border border-l-0 border-[var(--color-border-base)] rounded-r-md flex items-center justify-center p-1 text-center text-[10px] font-bold text-[var(--color-primary-accent)]">
                                {tile.right}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DominosGame;
