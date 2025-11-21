
import React from 'react';

const PropagationArtifactsVisual: React.FC = () => {
  const reflectorPos = '60%';
  const objectPosY = '40%';
  const objectPosX = '30%';

  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden"
         style={{
           '--reflector-pos': reflectorPos,
           '--object-pos-y': objectPosY,
           '--object-pos-x': objectPosX,
         } as React.CSSProperties}>
      <div className="w-full h-full relative">
        {/* Transducer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-2 bg-blue-300 rounded-b-sm"></div>
        <p className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300">Probe</p>
        
        {/* True Object */}
        <div className="absolute w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-xs text-black" style={{ top: objectPosY, left: objectPosX }}>
          True
        </div>

        {/* Strong Reflector (Diaphragm) */}
        <div className="absolute w-full h-1 bg-white/80" style={{ top: reflectorPos }}></div>
        <p className="absolute text-xs text-white/80" style={{ top: `calc(${reflectorPos} + 5px)`, left: '10px' }}>Strong Reflector</p>


        {/* False (Mirror) Object */}
        <div className="absolute w-8 h-8 bg-green-400/50 border-2 border-dashed border-green-300 rounded-full flex items-center justify-center text-xs text-black/70" 
             style={{ top: `calc(${reflectorPos} + (${reflectorPos} - ${objectPosY}))`, left: objectPosX }}>
          False
        </div>
        
        {/* Animated Pulse Path */}
        <div 
          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
          style={{
            animation: 'mirror-path-animation 4s linear infinite'
          }}
        ></div>

         {/* Reverberation Artifact */}
        <div className="absolute top-[20%] right-[15%] w-0.5 h-12 bg-gray-600/50 flex flex-col justify-around">
            <div className="w-6 h-1 bg-cyan-300"></div>
            <div className="w-6 h-1 bg-cyan-300/80"></div>
            <div className="w-6 h-1 bg-cyan-300/60"></div>
            <div className="w-6 h-1 bg-cyan-300/40"></div>
        </div>
         <p className="absolute top-[10%] right-[5%] text-xs font-mono text-cyan-200">Reverberation</p>
      </div>
      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Propagation Artifacts</p>
    </div>
  );
};

export default PropagationArtifactsVisual;
