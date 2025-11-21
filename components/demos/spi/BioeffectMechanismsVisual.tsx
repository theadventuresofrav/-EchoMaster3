
import React from 'react';

const BioeffectMechanismsVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex items-center justify-around p-4 relative overflow-hidden">
      
      {/* Thermal Effect */}
      <div className="w-1/2 h-full flex flex-col items-center border-r border-white/10 pr-4">
        <p className="font-semibold text-orange-300 mb-2">Thermal Effect (Heating)</p>
        <p className="text-xs text-white/70 text-center mb-4">Sound absorption causes tissue temperature to rise.</p>
        <div className="w-32 h-32 relative flex items-center justify-center">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="absolute w-2 h-2 bg-teal-300 rounded-full" style={{ 
                    transform: `rotate(${i * 18}deg) translateX(40px)`,
                    animation: `particle-oscillation 0.5s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.05}s`
                }}></div>
            ))}
            <div className="absolute w-16 h-16 bg-red-500/30 rounded-full blur-lg"></div>
        </div>
         <p className="text-sm font-mono text-orange-400 mt-4">Measured by: TI</p>
      </div>

      {/* Mechanical Effect */}
      <div className="w-1/2 h-full flex flex-col items-center pl-4">
        <p className="font-semibold text-red-400 mb-2">Mechanical Effect (Cavitation)</p>
        <p className="text-xs text-white/70 text-center mb-4">Pressure changes create and collapse microbubbles.</p>
        <div className="w-32 h-32 relative flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-white rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
            <p className="absolute top-[50%] left-[calc(50%+20px)] text-xs text-white/80">Bubble Collapse</p>
        </div>
         <p className="text-sm font-mono text-red-400 mt-4">Measured by: MI</p>
      </div>


      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Bioeffect Mechanisms</p>
    </div>
  );
};

export default BioeffectMechanismsVisual;
