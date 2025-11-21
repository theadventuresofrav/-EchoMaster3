
import React from 'react';

const NonLinearPropagationVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full h-full flex flex-col justify-around">
        {/* Initial Wave (Sinusoidal) */}
        <div>
          <p className="text-sm font-semibold text-white/80 mb-2">Near Field: Fundamental Frequency</p>
          <svg className="w-full h-16" viewBox="0 0 200 40">
            <path d="M 0 20 Q 25 0, 50 20 T 100 20 T 150 20 T 200 20" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        <div className="w-full text-center text-white/60 font-mono text-2xl">↓</div>
        
        {/* Distorted Wave (Harmonics) */}
        <div>
          <p className="text-sm font-semibold text-white/80 mb-2">Far Field: Fundamental + Harmonics</p>
           <svg className="w-full h-16" viewBox="0 0 200 40">
            <path d="M 0 20 C 15 0, 35 0, 50 20 S 65 40, 85 40, 100 20 C 115 0, 135 0, 150 20 S 165 40, 185 40, 200 20" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
             <path d="M 0 20 Q 25 0, 50 20 T 100 20 T 150 20 T 200 20" stroke="#38bdf8" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
          </svg>
        </div>
      </div>
      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Non-Linear Propagation</p>
    </div>
  );
};

export default NonLinearPropagationVisual;
