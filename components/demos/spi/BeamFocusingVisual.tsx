
import React from 'react';

const BeamFocusingVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full h-full relative">
        {/* Transducer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-blue-300 rounded-b-sm"></div>

        {/* Beam Shape */}
        <div 
          className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-full bg-gradient-to-b from-blue-500/20 to-transparent"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 55% 50%, 45% 50%, 0% 0%)' }}
        ></div>
         <div 
          className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-full bg-gradient-to-b from-blue-500/10 to-transparent"
          style={{ clipPath: 'polygon(45% 50%, 55% 50%, 75% 100%, 25% 100%)' }}
        ></div>

        {/* Labels */}
        <p className="absolute top-4 left-[calc(50%-70px)] text-xs text-white/70 font-mono">Near Zone</p>
        <div className="absolute top-[50%] -translate-y-1/2 left-[calc(50%+15px)]">
             <div className="h-0.5 w-8 bg-yellow-400"></div>
             <p className="text-xs text-yellow-300 font-mono -ml-2">Focal Zone</p>
             <p className="text-xs text-yellow-300 font-mono -ml-2">(Best Lateral Resolution)</p>
        </div>
        <p className="absolute top-[75%] left-[calc(50%-70px)] text-xs text-white/70 font-mono">Far Zone</p>
        
      </div>
      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Beam Focusing</p>
    </div>
  );
};

export default BeamFocusingVisual;
