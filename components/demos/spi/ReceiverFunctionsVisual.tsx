
import React from 'react';

const ReceiverFunctionsVisual: React.FC = () => {
  const functions = [
    { name: 'Gain', desc: 'Amplifies all signals' },
    { name: 'TGC', desc: 'Compensates for depth' },
    { name: 'Compression', desc: 'Reduces dynamic range' },
    { name: 'Demodulation', desc: 'Rectification & smoothing' },
    { name: 'Reject', desc: 'Filters low-level noise' },
  ];

  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="flex items-center space-x-2">
            {functions.map((func, index) => (
                <React.Fragment key={func.name}>
                    <div className="flex flex-col items-center w-24">
                        <div className="p-2 bg-blue-900/50 border border-blue-500/50 rounded-md text-center">
                            <p className="text-sm font-bold text-blue-300">{func.name}</p>
                        </div>
                        <p className="text-[10px] text-white/70 text-center mt-1">{func.desc}</p>
                    </div>
                    {index < functions.length - 1 && (
                        <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    )}
                </React.Fragment>
            ))}
        </div>
      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Receiver Functions (in order)</p>
    </div>
  );
};

export default ReceiverFunctionsVisual;
