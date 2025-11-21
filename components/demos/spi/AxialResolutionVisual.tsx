
import React from 'react';

const AxialResolutionVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex items-center justify-around p-4 relative overflow-hidden">
      
      {/* Good Axial Resolution */}
      <div className="w-1/2 h-full flex flex-col items-center border-r border-white/10 pr-4">
        <p className="font-semibold text-green-300 mb-2">Good Axial Resolution</p>
        <p className="text-xs text-white/70 text-center mb-4">High Frequency = Short SPL<br/>(Objects Resolved)</p>

        {/* Short Pulse */}
        <div className="w-3 h-4 bg-yellow-300 rounded-sm mb-4"></div>
        <div className="text-xs font-mono text-yellow-300">Pulse</div>

        <div className="w-0.5 h-full bg-gray-700/50 relative">
            <div className="absolute top-[40%] -left-2 w-5 h-1 bg-cyan-400 rounded-full"></div>
            <div className="absolute top-[50%] -left-2 w-5 h-1 bg-cyan-400 rounded-full"></div>
            <p className="absolute top-[60%] -left-10 text-xs text-cyan-300">Two Objects</p>
        </div>
      </div>

      {/* Poor Axial Resolution */}
      <div className="w-1/2 h-full flex flex-col items-center pl-4">
        <p className="font-semibold text-red-300 mb-2">Poor Axial Resolution</p>
        <p className="text-xs text-white/70 text-center mb-4">Low Frequency = Long SPL<br/>(Objects Not Resolved)</p>
        
        {/* Long Pulse */}
        <div className="w-3 h-10 bg-yellow-300 rounded-sm mb-4"></div>
        <div className="text-xs font-mono text-yellow-300">Pulse</div>

        <div className="w-0.5 h-full bg-gray-700/50 relative">
            <div className="absolute top-[40%] -left-2 w-5 h-1 bg-cyan-400 rounded-full"></div>
            <div className="absolute top-[50%] -left-2 w-5 h-1 bg-cyan-400 rounded-full"></div>
            <p className="absolute top-[60%] -left-10 text-xs text-cyan-300">One Object</p>
        </div>
      </div>


      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Axial Resolution (LARRD)</p>
    </div>
  );
};

export default AxialResolutionVisual;
