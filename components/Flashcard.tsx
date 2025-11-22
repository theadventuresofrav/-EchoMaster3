
import React, { useState } from 'react';
import type { FlashcardData } from '../types';

interface FlashcardProps {
  card: FlashcardData;
}

const Flashcard: React.FC<FlashcardProps> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="flashcard-container h-72 w-full group perspective-1000" 
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flashcard relative w-full h-full cursor-pointer transition-all duration-500 transform-style-3d ${isFlipped ? 'is-flipped' : ''}`}>
        
        {/* Front Face */}
        <div className="flashcard-front absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-[var(--color-bg-surface)] to-[var(--color-bg-surface-light)] border border-[var(--color-border-base)] rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg group-hover:border-[var(--color-primary-accent)] group-hover:shadow-[0_0_20px_-5px_var(--color-primary-accent-glow)] transition-all">
            
            {/* Top Icon */}
            <div className="absolute top-4 right-4 text-[var(--color-text-muted)] opacity-50 group-hover:text-[var(--color-primary-accent)] group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-4.991-2.696v4.992" />
                </svg>
            </div>
            
            {/* Decorative Element */}
            <div className="w-16 h-16 mb-6 rounded-full bg-[var(--color-primary-accent)]/10 flex items-center justify-center border border-[var(--color-primary-accent)]/20 group-hover:scale-110 transition-transform duration-500">
                <span className="text-3xl font-serif text-[var(--color-primary-accent)]">?</span>
            </div>

            {/* Term */}
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[var(--color-text-heading)] text-center leading-tight px-2">
                {card.term}
            </h3>
            
            {/* Hint */}
            <p className="absolute bottom-6 text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-semibold opacity-60 group-hover:opacity-100 transition-opacity">
                Tap to Reveal
            </p>
        </div>
        
        {/* Back Face */}
        <div className="flashcard-back absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[var(--color-bg-surface-light)] border-2 border-[var(--color-primary-accent)] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-[0_0_30px_var(--color-primary-accent-glow)]">
           <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary-accent)]/5 to-transparent rounded-xl pointer-events-none"></div>
           
           <div className="overflow-y-auto max-h-full w-full relative z-10 scrollbar-hide">
             <p className="text-base md:text-lg text-[var(--color-text-base)] leading-relaxed font-medium">
              {card.definition}
             </p>
           </div>

           {/* Bottom decoration */}
           <div className="absolute bottom-3 w-full flex justify-center gap-1 opacity-50">
                <div className="w-1 h-1 rounded-full bg-[var(--color-primary-accent)]"></div>
                <div className="w-1 h-1 rounded-full bg-[var(--color-primary-accent)]"></div>
                <div className="w-1 h-1 rounded-full bg-[var(--color-primary-accent)]"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
