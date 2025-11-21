
import React from 'react';

const DopplerModesVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex items-center justify-around p-4 relative overflow-hidden">
      
      {/* CW Doppler */}
      <div className="text-center w-1/4">
        <p className="font-semibold mb-2">CW Doppler</p>
        <div className="h-24 w-full bg-black/20 rounded p-1">
            <div className="w-full h-full border-2 border-dashed border-gray-600 relative">
                <p className="text-xs text-white/70 absolute top-1 left-1">Range Ambiguity</p>
            </div>
        </div>
        <p className="text-xs text-green-300 mt-2">No Aliasing</p>
      </div>

      {/* PW Doppler */}
      <div className="text-center w-1/4">
        <p className="font-semibold mb-2">PW Doppler</p>
        <div className="h-24 w-full bg-black/20 rounded p-1">
             <div className="w-full h-full border-2 border-gray-600 relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-6 h-1 bg-yellow-400"></div>
                <p className="text-xs text-yellow-300 absolute top-1 left-1">[Gate]</p>
            </div>
        </div>
        <p className="text-xs text-red-400 mt-2">Prone to Aliasing</p>
      </div>
      
      {/* Color Doppler */}
      <div className="text-center w-1/4">
        <p className="font-semibold mb-2">Color Doppler</p>
        <div className="h-24 w-full bg-black/20 rounded p-1 flex items-center justify-center">
            <div className="w-16 h-10 bg-gradient-to-r from-red-500 via-black to-blue-500"></div>
        </div>
        <p className="text-xs text-white/70 mt-2">Shows Direction (BART)</p>
      </div>

      {/* Power Doppler */}
      <div className="text-center w-1/4">
        <p className="font-semibold mb-2">Power Doppler</p>
        <div className="h-24 w-full bg-black/20 rounded p-1 flex items-center justify-center">
             <div className="w-16 h-10 bg-gradient-to-r from-orange-600 via-yellow-400 to-orange-500"></div>
        </div>
        <p className="text-xs text-white/70 mt-2">More Sensitive, No Direction</p>
      </div>

      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Doppler Modalities</p>
    </div>
  );
};

export default DopplerModesVisual;
