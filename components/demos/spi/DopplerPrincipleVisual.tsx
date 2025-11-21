
import React from 'react';

const DopplerPrincipleVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full h-full relative">
        {/* Probe */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-blue-300 rounded-b-sm"></div>
        
        {/* Center Line */}
        <div className="absolute top-3 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gray-700/50"></div>

        {/* Flow towards (Positive shift) */}
        <div className="absolute top-[30%] left-0 w-1/2 h-10">
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full" style={{ animation: 'pw-doppler-flow 3s linear infinite' }}></div>
            <p className="absolute top-0 left-1/2 -translate-x-1/2 text-sm text-red-400 font-bold">TOWARDS</p>
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-white/80">Positive Shift ↑ Frequency</p>
        </div>
        
        {/* Flow away (Negative shift) */}
        <div className="absolute top-[60%] right-0 w-1/2 h-10">
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full" style={{ animation: 'pw-doppler-flow 3s linear infinite reverse' }}></div>
            <p className="absolute top-0 left-1/2 -translate-x-1/2 text-sm text-blue-400 font-bold">AWAY</p>
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-white/80">Negative Shift ↓ Frequency</p>
        </div>
      </div>
      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: The Doppler Principle</p>
    </div>
  );
};

export default DopplerPrincipleVisual;
