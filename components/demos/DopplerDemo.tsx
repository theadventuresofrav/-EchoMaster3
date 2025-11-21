
import React from 'react';

const DopplerDemo: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full h-full relative">
        {/* Ultrasound Beam Path */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-blue-500/30"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-blue-300 rounded-b-md text-xs text-center text-black font-bold pt-0.5">PROBE</div>

        {/* Blood Vessel */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-12 bg-red-900/50 border-y-2 border-red-500/50"></div>

        {/* Sample Gate */}
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-1 bg-yellow-400"></div>
        <div className="absolute top-[calc(50%-2px)] left-1/2 -translate-x-1/2 h-1 text-xs text-yellow-300 font-mono -mt-5">[Sample Gate]</div>
        

        {/* Red Blood Cell */}
        <div className="absolute top-1/2 w-4 h-4 bg-red-500 rounded-full" style={{ animation: 'pw-doppler-flow 3s linear infinite' }}></div>

        {/* PW Pulse */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-1 bg-white rounded-full"
          style={{ animation: 'pw-pulse-travel 1.5s linear infinite' }}
        ></div>
      </div>
       <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Pulsed-Wave (PW) Doppler</p>
    </div>
  );
};

export default DopplerDemo;
