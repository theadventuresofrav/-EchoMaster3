
import React from 'react';

const ArrayTypesVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex items-center justify-around p-4 relative overflow-hidden">
      
      {/* Linear Array */}
      <div className="flex flex-col items-center w-1/3 h-full">
        <div className="w-20 h-3 bg-blue-300 rounded-sm"></div>
        <p className="text-xs text-blue-300/80 my-1">Linear</p>
        <div className="relative w-20 h-32 bg-gradient-to-b from-blue-500/30 to-transparent"></div>
        <p className="text-xs text-center text-white/60 mt-2">Rectangular Image</p>
      </div>

      {/* Curvilinear Array */}
      <div className="flex flex-col items-center w-1/3 h-full">
        <div className="w-16 h-3 bg-blue-300 rounded-t-full"></div>
        <p className="text-xs text-blue-300/80 my-1">Curvilinear</p>
        <div className="relative w-24 h-32 bg-gradient-to-b from-blue-500/30 to-transparent" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }}></div>
        <p className="text-xs text-center text-white/60 mt-2">Trapezoidal Image</p>
      </div>

      {/* Phased Array */}
      <div className="flex flex-col items-center w-1/3 h-full">
        <div className="w-8 h-3 bg-blue-300 rounded-sm"></div>
        <p className="text-xs text-blue-300/80 my-1">Phased</p>
        <div className="relative w-32 h-32 bg-gradient-to-b from-blue-500/30 to-transparent origin-top-center" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0% 100%)' }}></div>
        <p className="text-xs text-center text-white/60 mt-2">Sector Image</p>
      </div>

      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Array Types & Beam Formation</p>
    </div>
  );
};

export default ArrayTypesVisual;
