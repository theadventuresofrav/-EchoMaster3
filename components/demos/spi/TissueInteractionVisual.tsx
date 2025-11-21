
import React from 'react';

const TissueInteractionVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full h-full relative">
        {/* Tissue Layers */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-teal-900/30">
             <p className="absolute top-2 left-2 text-sm text-teal-300">Tissue 1 (Low Impedance)</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-indigo-900/30">
            <p className="absolute bottom-2 left-2 text-sm text-indigo-300">Tissue 2 (High Impedance)</p>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-white/50"></div>

        {/* Beams */}
        <div className="absolute top-0 left-1/4 h-full w-48">
             {/* Incident Beam */}
            <div className="absolute top-0 left-0 w-1 h-32 bg-yellow-300 origin-bottom-left" style={{ transform: 'rotate(20deg)' }}></div>
            <p className="absolute top-8 left-10 text-xs text-yellow-300 rotate-[20deg]">Incident</p>
            
            {/* Reflected Beam */}
            <div className="absolute top-0 left-0 w-1 h-32 bg-green-300 origin-bottom-left" style={{ transform: 'rotate(-20deg) scaleY(0.8)' }}></div>
            <p className="absolute top-8 left-0 text-xs text-green-300 -rotate-[20deg]">Reflected</p>

            {/* Transmitted/Refracted Beam */}
            <div className="absolute bottom-0 left-[53px] w-1 h-32 bg-orange-300 origin-top-left" style={{ transform: 'rotate(15deg) scaleY(0.9)' }}></div>
             <p className="absolute bottom-10 left-[75px] text-xs text-orange-300 rotate-[15deg]">Transmitted</p>
        </div>
      </div>
      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Interaction with Media</p>
    </div>
  );
};

export default TissueInteractionVisual;
