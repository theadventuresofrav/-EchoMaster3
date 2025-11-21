
import React from 'react';

const FlowPatternsVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex flex-col items-center justify-around p-4 relative overflow-hidden">
      
      {/* Laminar Flow */}
      <div className="w-full h-1/2 flex flex-col items-center justify-center">
        <p className="font-semibold text-green-300 mb-2">Laminar Flow (Normal)</p>
        <div className="w-full h-12 bg-red-900/30 border-y-2 border-red-500/30 relative overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute left-0 w-full h-0.5 bg-red-400" style={{ 
                    top: `${15 + i * 15}%`,
                    animation: `pw-doppler-flow ${2.5 + i*0.2}s linear infinite` 
                }}></div>
            ))}
        </div>
      </div>

      {/* Turbulent Flow */}
      <div className="w-full h-1/2 flex flex-col items-center justify-center">
        <p className="font-semibold text-red-300 mb-2">Turbulent Flow (Stenosis)</p>
        <div className="w-full h-12 bg-red-900/30 border-y-2 border-red-500/30 relative overflow-hidden flex items-center">
            {/* Stenosis */}
            <div className="absolute w-2 h-4 bg-yellow-400 left-1/3 -translate-y-1/2 top-0"></div>
            <div className="absolute w-2 h-4 bg-yellow-400 left-1/3 top-1/2"></div>

            {/* Flow lines */}
            <div className="absolute w-2 h-2 rounded-full bg-red-400 animate-spin" style={{ top: '30%', left: '50%'}}></div>
            <div className="absolute w-2 h-2 rounded-full bg-red-400 animate-ping" style={{ top: '60%', left: '60%'}}></div>
            <div className="absolute w-3 h-1 bg-red-400" style={{ top: '50%', left: '70%', transform: 'rotate(45deg)' }}></div>
            <div className="absolute w-3 h-1 bg-red-400" style={{ top: '40%', left: '80%', transform: 'rotate(-30deg)' }}></div>
        </div>
      </div>

      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Flow Patterns</p>
    </div>
  );
};

export default FlowPatternsVisual;
