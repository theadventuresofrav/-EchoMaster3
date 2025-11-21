
import React from 'react';

const QaPhantomVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <p className="font-semibold text-white/80 mb-2">QA Phantom</p>
        <div className="w-48 h-32 bg-gray-700/50 border-2 border-gray-600 p-2 relative">
            {/* Vertical pins for distance accuracy */}
            {[...Array(5)].map((_, i) => (
                 <div key={i} className="absolute top-4 w-px h-px bg-white" style={{ left: `${10 + i * 20}%`}}></div>
            ))}
             <p className="absolute top-0 left-2 text-[10px] text-white/60">Distance Accuracy</p>

            {/* Horizontal pins for dead zone */}
            {[...Array(4)].map((_, i) => (
                 <div key={i} className="absolute left-4 w-px h-px bg-white" style={{ top: `${15 + i * 15}%`}}></div>
            ))}
            <p className="absolute top-2 right-2 text-[10px] text-white/60 -rotate-90 origin-top-right">Dead Zone</p>

            {/* Axial/Lateral Resolution Pins */}
             <div className="absolute bottom-4 left-1/2 w-4 h-4">
                <div className="absolute top-0 left-0 w-px h-px bg-yellow-300"></div>
                <div className="absolute top-1 left-0 w-px h-px bg-yellow-300"></div>
                <div className="absolute top-0 left-1 w-px h-px bg-yellow-300"></div>
                <div className="absolute top-1 left-1 w-px h-px bg-yellow-300"></div>
             </div>
             <p className="absolute bottom-1 right-2 text-[10px] text-yellow-300">Resolution</p>
        </div>
      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: QA Phantom</p>
    </div>
  );
};

export default QaPhantomVisual;
