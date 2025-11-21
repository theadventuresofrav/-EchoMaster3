
import React from 'react';

const PulseEchoPrincipleVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="w-1/3 h-full flex flex-col items-center relative">
        <div className="w-12 h-3 bg-blue-300 rounded-b-sm"></div>
        <p className="text-xs text-blue-300/80 my-2">Probe</p>
        
        <div className="w-0.5 h-full bg-gray-600/50 relative">
            {/* Pulse */}
            <div className="absolute left-1/2 -translate-x-1/2 w-2 h-1 bg-yellow-300" style={{ animation: 'pw-pulse-travel 1.5s linear infinite' }}></div>

            {/* Target */}
            <div className="absolute top-[60%] -left-3 w-6 h-1 bg-cyan-400"></div>
        </div>
      </div>

      <div className="w-2/3 h-full bg-black/20 rounded-md p-4">
        <h3 className="text-lg font-semibold text-yellow-300 font-mono">Range Equation</h3>
        <p className="text-sm text-white/80 mt-2">Depth = (Speed of Sound × Time of Flight) / 2</p>
        <p className="text-sm text-white/80 mt-4">For every <span className="text-yellow-300">1 cm</span> of depth, it takes <span className="text-yellow-300">13 µs</span> for the pulse to travel there and back.</p>
        <div className="mt-6 p-3 bg-gray-800/50 rounded-md">
            <p className="text-mono text-white">Target Depth: <span className="font-bold text-cyan-300">4 cm</span></p>
            <p className="text-mono text-white">Time of Flight: 4 cm × 13 µs/cm = <span className="font-bold text-cyan-300">52 µs</span></p>
        </div>
      </div>

      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Pulse-Echo Principle</p>
    </div>
  );
};

export default PulseEchoPrincipleVisual;
