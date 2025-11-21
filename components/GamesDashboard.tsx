import React, { useState } from 'react';
import { GameControllerIcon, PuzzleIcon, LockClosedIcon, GridIcon, TableCellsIcon } from './icons';
import JeopardyGame from './games/JeopardyGame';
import EscapeRoomGame from './games/EscapeRoomGame';
import CrosswordGame from './games/CrosswordGame';
import BingoGame from './games/BingoGame';

type GameType = 'jeopardy' | 'escape' | 'crossword' | 'bingo' | null;

const GamesDashboard: React.FC = () => {
    const [activeGame, setActiveGame] = useState<GameType>(null);

    if (activeGame === 'jeopardy') return <JeopardyGame onExit={() => setActiveGame(null)} />;
    if (activeGame === 'escape') return <EscapeRoomGame onExit={() => setActiveGame(null)} />;
    if (activeGame === 'crossword') return <CrosswordGame onExit={() => setActiveGame(null)} />;
    if (activeGame === 'bingo') return <BingoGame onExit={() => setActiveGame(null)} />;

    return (
        <main className="md:ml-64 pt-20 px-4 md:px-8 pb-8 h-full">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8 animate-section-enter">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-text-heading)] tracking-tight flex items-center gap-4">
                        <GameControllerIcon className="w-10 h-10 text-[var(--color-primary-accent)]" />
                        Learning Arcade
                    </h1>
                    <p className="mt-2 text-lg text-[var(--color-text-muted)]">
                        Reinforce your ultrasound physics knowledge with interactive games.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Jeopardy Card */}
                    <button 
                        onClick={() => setActiveGame('jeopardy')}
                        className="group relative overflow-hidden rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border-base)] p-6 text-left transition-all hover:border-[var(--color-primary-accent)] hover:shadow-[0_0_30px_-5px_var(--color-primary-accent-glow)] animate-section-enter"
                        style={{ animationDelay: '100ms' }}
                    >
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <GridIcon className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">Physics Jeopardy</h3>
                        <p className="text-[var(--color-text-muted)]">Test your knowledge across categories like Waves, Transducers, and Doppler in this classic quiz format.</p>
                    </button>

                    {/* Escape Room Card */}
                    <button 
                        onClick={() => setActiveGame('escape')}
                        className="group relative overflow-hidden rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border-base)] p-6 text-left transition-all hover:border-[var(--color-primary-accent)] hover:shadow-[0_0_30px_-5px_var(--color-primary-accent-glow)] animate-section-enter"
                        style={{ animationDelay: '200ms' }}
                    >
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/20 text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
                            <LockClosedIcon className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">Lab Escape Room</h3>
                        <p className="text-[var(--color-text-muted)]">Solve physics riddles and fix machine settings to unlock the doors and escape the ultrasound lab.</p>
                    </button>

                    {/* Crossword Card */}
                    <button 
                        onClick={() => setActiveGame('crossword')}
                        className="group relative overflow-hidden rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border-base)] p-6 text-left transition-all hover:border-[var(--color-primary-accent)] hover:shadow-[0_0_30px_-5px_var(--color-primary-accent-glow)] animate-section-enter"
                        style={{ animationDelay: '300ms' }}
                    >
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <PuzzleIcon className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">Term Crossword</h3>
                        <p className="text-[var(--color-text-muted)]">Challenge your vocabulary. Fill in the blanks for key ultrasound definitions and concepts.</p>
                    </button>

                    {/* Bingo Card */}
                    <button 
                        onClick={() => setActiveGame('bingo')}
                        className="group relative overflow-hidden rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border-base)] p-6 text-left transition-all hover:border-[var(--color-primary-accent)] hover:shadow-[0_0_30px_-5px_var(--color-primary-accent-glow)] animate-section-enter"
                        style={{ animationDelay: '400ms' }}
                    >
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                            <TableCellsIcon className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">Physics Bingo</h3>
                        <p className="text-[var(--color-text-muted)]">Generate a card of physics terms. Match them as they appear to get 5 in a row!</p>
                    </button>
                </div>
            </div>
        </main>
    );
};

export default GamesDashboard;