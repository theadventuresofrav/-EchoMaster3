
import React from 'react';

const SafetyIndicesVisual: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex items-center justify-around p-4 relative overflow-hidden">
      
      <div className="w-1/2">
        <h3 className="font-semibold text-lg mb-4">Machine Settings</h3>
        <div className="space-y-4">
            <div>
                <label className="text-sm text-white/80">Output Power</label>
                <div className="w-full h-2 bg-black/30 rounded-full mt-1"><div className="w-3/4 h-full bg-blue-400 rounded-full"></div></div>
            </div>
            <div>
                <label className="text-sm text-white/80">Frequency</label>
                <div className="w-full h-2 bg-black/30 rounded-full mt-1"><div className="w-1/2 h-full bg-blue-400 rounded-full"></div></div>
            </div>
            <div>
                <label className="text-sm text-white/80">Focus</label>
                <div className="w-full h-2 bg-black/30 rounded-full mt-1"><div className="w-2/3 h-full bg-blue-400 rounded-full"></div></div>
            </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center h-full border-l border-white/10 pl-8">
        <h3 className="font-semibold text-lg mb-4">Safety Indices</h3>
        <div className="flex space-x-8">
            <div className="text-center">
                <p className="text-orange-300 font-mono text-3xl font-bold">0.8</p>
                <p className="text-sm text-orange-300/80">Thermal Index (TI)</p>
            </div>
             <div className="text-center">
                <p className="text-red-400 font-mono text-3xl font-bold">1.2</p>
                <p className="text-sm text-red-400/80">Mechanical Index (MI)</p>
            </div>
        </div>
        <div className="mt-6 p-3 bg-green-900/30 border border-green-500/50 rounded-md">
            <p className="font-bold text-green-300">ALARA Principle:</p>
            <p className="text-xs text-white/80">As Low As Reasonably Achievable</p>
        </div>
      </div>

      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Safety Indices</p>
    </div>
  );
};

export default SafetyIndicesVisual;
