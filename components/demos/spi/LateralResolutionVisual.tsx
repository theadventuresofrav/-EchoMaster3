
import React from 'react';

const LateralResolutionVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex items-center justify-around p-4 relative overflow-hidden">
      
      {/* Good Lateral Resolution */}
      <div className="w-1/2 h-full flex flex-col items-center border-r border-white/10 pr-4">
        <p className="font-semibold text-green-300 mb-2">Good Lateral Resolution</p>
        <p className="text-xs text-white/70 text-center mb-4">Narrow Beam Width<br/>(Objects Resolved)</p>

        {/* Narrow Beam */}
        <div className="w-8 h-2 bg-blue-300 mb-4"></div>
        <div className="h-full w-8 bg-gradient-to-b from-blue-500/20 to-transparent relative">
            <div className="absolute top-[50%] left-0 w-1 h-1 bg-cyan-400 rounded-full"></div>
            <div className="absolute top-[50%] right-0 w-1 h-1 bg-cyan-400 rounded-full"></div>
             <p className="absolute top-[60%] -left-10 text-xs text-cyan-300">Two Objects</p>
        </div>
      </div>

      {/* Poor Lateral Resolution */}
      <div className="w-1/2 h-full flex flex-col items-center pl-4">
        <p className="font-semibold text-red-300 mb-2">Poor Lateral Resolution</p>
        <p className="text-xs text-white/70 text-center mb-4">Wide Beam Width<br/>(Objects Not Resolved)</p>
        
        {/* Wide Beam */}
        <div className="w-16 h-2 bg-blue-300 mb-4"></div>
        <div className="h-full w-16 bg-gradient-to-b from-blue-500/20 to-transparent relative">
            <div className="absolute top-[50%] left-[25%] w-1 h-1 bg-cyan-400 rounded-full"></div>
            <div className="absolute top-[50%] right-[25%] w-1 h-1 bg-cyan-400 rounded-full"></div>
            <p className="absolute top-[60%] -left-10 text-xs text-cyan-300">One Object</p>
        </div>
      </div>


      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Lateral Resolution (LATA)</p>
    </div>
  );
};

export default LateralResolutionVisual;
