
import React from 'react';

const AttenuationArtifactsVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full h-full relative">
        {/* Transducer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-blue-300 rounded-b-sm"></div>
        
        {/* Ultrasound Beam */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-full bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>

        {/* Shadowing Object (e.g., bone) */}
        <div className="absolute top-[30%] left-[20%] w-10 h-10 bg-gray-300 rounded-md flex items-center justify-center text-xs text-black">Bone</div>
        {/* Shadow */}
        <div className="absolute top-[calc(30%+40px)] left-[20%] w-10 h-28 bg-gradient-to-b from-black/60 to-black/80"></div>
        <p className="absolute top-[calc(30%+45px)] left-[calc(20%+45px)] text-xs text-red-300 font-mono">Shadowing</p>


        {/* Enhancing Object (e.g., cyst) */}
        <div className="absolute top-[40%] left-[60%] w-10 h-10 border-2 border-cyan-300 rounded-full flex items-center justify-center text-xs text-cyan-200">Cyst</div>
        {/* Enhancement */}
        <div className="absolute top-[calc(40%+40px)] left-[60%] w-10 h-24 bg-gradient-to-b from-white/30 to-white/10"></div>
        <p className="absolute top-[calc(40%+45px)] left-[calc(60%-60px)] text-xs text-green-300 font-mono">Enhancement</p>

      </div>
      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Attenuation Artifacts</p>
    </div>
  );
};

export default AttenuationArtifactsVisual;
