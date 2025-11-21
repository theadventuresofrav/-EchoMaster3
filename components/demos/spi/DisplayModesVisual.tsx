
import React from 'react';

const DisplayModesVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex items-center justify-around p-4 relative overflow-hidden">
      
      {/* A-Mode */}
      <div className="flex flex-col items-center w-1/3 h-full">
        <p className="font-semibold text-white/80 mb-2">A-Mode</p>
        <div className="w-full h-full bg-black/20 rounded-md p-2 relative">
            <svg width="100%" height="100%" viewBox="0 0 100 50">
                <line x1="0" y1="40" x2="100" y2="40" stroke="#4b5563" strokeWidth="1" />
                <polyline points="20,40 20,10 22,40" stroke="#fbbF24" strokeWidth="1.5" fill="none" />
                <polyline points="50,40 50,20 52,40" stroke="#fbbF24" strokeWidth="1.5" fill="none" />
                <polyline points="80,40 80,5 82,40" stroke="#fbbF24" strokeWidth="1.5" fill="none" />
                 <text x="50" y="48" textAnchor="middle" fill="white" fontSize="5">Depth</text>
                 <text x="5" y="10" transform="rotate(-90 5,10)" fill="white" fontSize="5">Amplitude</text>
            </svg>
        </div>
      </div>

      {/* B-Mode */}
      <div className="flex flex-col items-center w-1/3 h-full">
        <p className="font-semibold text-white/80 mb-2">B-Mode</p>
         <div className="w-full h-full bg-black/20 rounded-md p-2 relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gray-400"></div>
            <div className="absolute top-1/4 left-1/2 w-3 h-3 rounded-full bg-gray-200"></div>
             <div className="absolute bottom-1/3 right-1/4 w-5 h-5 rounded-full bg-gray-600"></div>
         </div>
      </div>

      {/* M-Mode */}
      <div className="flex flex-col items-center w-1/3 h-full">
        <p className="font-semibold text-white/80 mb-2">M-Mode</p>
        <div className="w-full h-full bg-black/30 rounded-md overflow-hidden relative">
            <div className="absolute top-0 left-0 w-[200%] h-full flex" style={{ animation: 'm-mode-trace-draw 4s linear infinite' }}>
                {[...Array(2)].map((_, set) => (
                    <svg key={set} className="w-1/2 h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 0 40 C 10 35, 20 45, 30 40 S 50 35, 60 45 S 80 35, 90 45, 100 40" stroke="#f472b6" strokeWidth="1" fill="none" />
                        <path d="M 0 60 C 10 65, 20 55, 30 60 S 50 65, 60 55 S 80 65, 90 55, 100 60" stroke="#f472b6" strokeWidth="1" fill="none" />
                    </svg>
                ))}
            </div>
             <p className="absolute top-1 left-2 text-xs text-white/60">(Time →)</p>
        </div>
      </div>

      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Display Modes</p>
    </div>
  );
};

export default DisplayModesVisual;
