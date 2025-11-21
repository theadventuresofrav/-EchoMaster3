
import React from 'react';

const TransducerAnatomyVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-48 h-48 flex flex-col">
        {/* Backing Material */}
        <div className="h-1/3 bg-gray-600 flex items-center justify-center text-center">
            <p className="text-sm text-white/80">Backing Material<br/><span className="text-xs text-white/60">(Dampens Pulse)</span></p>
        </div>
        {/* PZT Crystal */}
        <div className="h-1/3 bg-blue-300 flex items-center justify-center text-center relative">
            <p className="text-sm font-bold text-black">PZT Crystal<br/><span className="font-normal text-xs">(Active Element)</span></p>
            {/* Electric wire */}
            <div className="absolute top-1/2 -left-8 w-8 h-0.5 bg-yellow-400"></div>
             <p className="absolute top-1/2 -left-12 text-xs text-yellow-300">Wire</p>
        </div>
         {/* Matching Layer */}
        <div className="h-1/3 bg-teal-500/50 flex items-center justify-center text-center">
            <p className="text-sm text-white/80">Matching Layer<br/><span className="text-xs text-white/60">(Reduces Impedance)</span></p>
        </div>
      </div>
      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Transducer Anatomy</p>
    </div>
  );
};

export default TransducerAnatomyVisual;
