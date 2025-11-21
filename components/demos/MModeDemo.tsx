
import React from 'react';

const MModeDemo: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Left side: B-Mode representation */}
      <div className="w-1/3 h-full flex flex-col items-center relative">
        <div className="w-12 h-3 bg-blue-300 rounded-b-sm"></div>
        <p className="text-xs text-blue-300/80 mb-2">B-Mode View</p>
        
        {/* M-Mode Line */}
        <div className="absolute top-3 bottom-0 w-0.5 bg-yellow-400/80 border-dashed"></div>

        {/* Simulated moving structure (e.g., heart wall) */}
        <div className="absolute w-8 h-3 bg-pink-400"
             style={{ top: '40%', animation: 'particle-oscillation 1s ease-in-out infinite' }}>
        </div>
         <div className="absolute w-12 h-3 bg-pink-400/70"
             style={{ top: '60%', animation: 'particle-oscillation 1s ease-in-out infinite reverse' }}>
        </div>
      </div>

      {/* Right side: M-Mode Trace */}
      <div className="w-2/3 h-full bg-black/30 rounded-md overflow-hidden relative">
         <p className="absolute top-1 left-2 text-xs text-white/60">M-Mode Trace (Time →)</p>
        <div className="absolute top-0 left-0 w-[200%] h-full flex" style={{ animation: 'm-mode-trace-draw 4s linear infinite' }}>
            {/* Generating two sets of traces for continuous loop */}
            {[...Array(2)].map((_, set) => (
                <svg key={set} className="w-1/2 h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d="M 0 40 C 10 35, 20 45, 30 40 S 50 35, 60 45 S 80 35, 90 45, 100 40"
                        stroke="#f472b6"
                        strokeWidth="1"
                        fill="none"
                    />
                     <path
                        d="M 0 60 C 10 65, 20 55, 30 60 S 50 65, 60 55 S 80 65, 90 55, 100 60"
                        stroke="#f472b6"
                        strokeWidth="1"
                        fill="none"
                    />
                </svg>
            ))}
        </div>
      </div>
      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: M-Mode (Motion Mode)</p>
    </div>
  );
};

export default MModeDemo;
