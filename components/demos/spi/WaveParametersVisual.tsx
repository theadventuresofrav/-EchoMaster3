
import React, { useState, useMemo } from 'react';

const WaveParametersVisual: React.FC = () => {
  const [frequency, setFrequency] = useState(2); // Represents number of full cycles
  const [amplitude, setAmplitude] = useState(30); // Represents pixel height from midline

  const wavePath = useMemo(() => {
    const width = 200;
    const height = 100;
    const midY = height / 2;
    
    const points = [];
    for (let x = 0; x <= width; x++) {
      const angle = (x / width) * (2 * Math.PI) * frequency;
      const y = midY - Math.sin(angle) * amplitude;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  }, [frequency, amplitude]);

  const wavelength = 200 / (frequency || 1);

  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <svg className="w-full h-48" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
            {/* Wave */}
            <path d={wavePath} stroke="#38bdf8" strokeWidth="2" fill="none" />
            
            {/* Amplitude */}
            <line x1={wavelength / 4} y1={50 - amplitude} x2={wavelength / 4} y2="50" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" />
            <text x={wavelength / 4 + 2} y={50 - amplitude / 2} fill="white" fontSize="6" className="font-mono">Amplitude</text>
            
            {/* Wavelength */}
            {frequency > 0 && (
              <g>
                <line x1="0" y1="60" x2={wavelength} y2="60" stroke="white" strokeWidth="0.5" />
                <line x1="0" y1="58" x2="0" y2="62" stroke="white" strokeWidth="0.5" />
                <line x1={wavelength} y1="58" x2={wavelength} y2="62" stroke="white" strokeWidth="0.5" />
                <text x={wavelength / 2 - 12} y="70" fill="white" fontSize="6" className="font-mono">Wavelength</text>
              </g>
            )}
        </svg>

        <div className="absolute bottom-6 flex space-x-4 w-full justify-center px-4">
             <div className="text-center flex-1 max-w-xs">
                 <label htmlFor="frequency-slider" className="text-xs text-white/70 font-mono">Frequency</label>
                 <input
                    id="frequency-slider"
                    type="range"
                    min="1" max="5" step="0.5"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                 />
             </div>
              <div className="text-center flex-1 max-w-xs">
                 <label htmlFor="amplitude-slider" className="text-xs text-white/70 font-mono">Amplitude</label>
                 <input
                    id="amplitude-slider"
                    type="range"
                    min="5" max="45" step="1"
                    value={amplitude}
                    onChange={(e) => setAmplitude(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                 />
             </div>
        </div>

        <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Interactive: Wave Parameters</p>
    </div>
  );
};

export default WaveParametersVisual;
