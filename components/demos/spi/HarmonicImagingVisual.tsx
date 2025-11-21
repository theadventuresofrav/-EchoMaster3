
import React from 'react';

const HarmonicImagingVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex items-center justify-around p-4 relative overflow-hidden">
      
      {/* Fundamental Imaging */}
      <div className="w-1/2 h-full flex flex-col items-center border-r border-white/10 pr-4">
        <p className="font-semibold text-white/80 mb-2">Fundamental Imaging</p>
        <div className="w-full h-full bg-black/20 rounded-md p-2 relative flex items-center justify-center overflow-hidden">
            {/* Clutter/Noise */}
            <div className="absolute w-full h-full opacity-30">
                 {[...Array(30)].map((_, i) => (
                    <div key={i} className="absolute w-px h-px bg-white rounded-full animate-pulse" style={{ 
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random()}s`
                    }}></div>
                ))}
            </div>
             <div className="absolute top-1/4 left-1/3 w-10 h-10 rounded-full bg-gray-400 opacity-70"></div>
             <div className="absolute bottom-1/4 right-1/4 w-8 h-12 rounded-lg bg-gray-600 opacity-70"></div>
        </div>
        <p className="text-xs text-red-300 text-center mt-2">Near-field artifacts & clutter</p>
      </div>

      {/* Harmonic Imaging */}
      <div className="w-1/2 h-full flex flex-col items-center pl-4">
        <p className="font-semibold text-white/80 mb-2">Tissue Harmonic Imaging (THI)</p>
        <div className="w-full h-full bg-black/20 rounded-md p-2 relative flex items-center justify-center">
             <div className="absolute top-1/4 left-1/3 w-10 h-10 rounded-full bg-gray-200 border border-white"></div>
             <div className="absolute bottom-1/4 right-1/4 w-8 h-12 rounded-lg bg-gray-500 border-2 border-white"></div>
        </div>
        <p className="text-xs text-green-300 text-center mt-2">Improved contrast & reduced artifacts</p>
      </div>

      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Harmonic Imaging</p>
    </div>
  );
};

export default HarmonicImagingVisual;
