
import React from 'react';

const PhysicalPrinciplesVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex flex-col items-center justify-around p-4 relative overflow-hidden">
      
      {/* Poiseuille's Law */}
      <div className="w-full flex items-center">
        <p className="text-sm font-semibold w-1/4 text-right pr-4">Poiseuille's Law (Radius)</p>
        <div className="w-1/2 flex items-center justify-around">
            <div className="text-center">
                <div className="w-12 h-12 border-2 border-red-500/50 rounded-full flex items-center justify-center"><p className="text-xs text-white/70">High Flow</p></div>
                <p className="text-xs mt-1">Large Radius</p>
            </div>
             <div className="text-center">
                <div className="w-6 h-6 border-2 border-red-500/50 rounded-full flex items-center justify-center"><p className="text-[8px] text-white/70">Low Flow</p></div>
                <p className="text-xs mt-1">Small Radius</p>
            </div>
        </div>
      </div>
      
       {/* Bernoulli Principle */}
      <div className="w-full flex items-center">
        <p className="text-sm font-semibold w-1/4 text-right pr-4">Bernoulli Principle (Stenosis)</p>
        <div className="w-3/4 h-12 bg-red-900/30 border-y-2 border-red-500/30 relative flex items-center">
            {/* Stenosis */}
            <div className="absolute w-2 h-4 bg-yellow-400 left-1/2 -translate-x-1/2 -translate-y-1/2 top-0"></div>
            <div className="absolute w-2 h-4 bg-yellow-400 left-1/2 -translate-x-1/2 top-1/2"></div>
            
            <p className="absolute left-[20%] text-xs text-white/70">High Pressure<br/>Low Velocity</p>
             <p className="absolute left-[45%] text-xs text-white/70 top-0">Low Pressure<br/>High Velocity</p>
             <p className="absolute left-[70%] text-xs text-white/70">High Pressure<br/>Low Velocity</p>
        </div>
      </div>


      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Hemodynamic Principles</p>
    </div>
  );
};

export default PhysicalPrinciplesVisual;
