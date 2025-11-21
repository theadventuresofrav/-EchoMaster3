
import React, { useState } from 'react';
import type { FlashcardData } from '../types';

interface FlashcardProps {
  card: FlashcardData;
}

const Flashcard: React.FC<FlashcardProps> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardBaseStyle = "flex items-center justify-center p-4 rounded-lg shadow-lg border";

  return (
    <div className="flashcard-container h-48 w-full" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`flashcard relative w-full h-full cursor-pointer ${isFlipped ? 'is-flipped' : ''}`}>
        {/* Front */}
        <div className={`${cardBaseStyle} flashcard-front bg-[var(--color-bg-surface)] bg-opacity-60 border-[var(--color-border-base)]`}>
          <h3 className="text-xl font-bold text-center text-[var(--color-primary-accent)]">{card.term}</h3>
        </div>
        
        {/* Back */}
        <div className={`${cardBaseStyle} flashcard-back bg-[var(--color-bg-surface-light)] bg-opacity-80 border-[var(--color-border-hover)]`}>
          <p className="text-sm text-center text-[var(--color-text-muted)]">{card.definition}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;