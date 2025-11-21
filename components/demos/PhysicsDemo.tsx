
import React from 'react';

const PhysicsDemo: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg bg-gray-900/50 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md mx-auto">
        {/* Transducer */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 w-2 h-16 bg-blue-300 rounded-sm" style={{ animation: 'transducer-vibrate 0.1s linear infinite' }}>
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-12 bg-blue-400 rounded"></div>
        </div>

        {/* Medium with Particles */}
        <div className="absolute top-0 left-10 right-0 bottom-0 flex items-center space-x-4">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              {[...Array(7)].map((_, j) => (
                <div
                  key={j}
                  className="w-1.5 h-1.5 bg-teal-300 rounded-full"
                  style={{ animation: `particle-oscillation 2s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          ))}
        </div>

        {/* Compression Wave */}
        <div 
            className="absolute top-1/2 -translate-y-1/2 left-10 h-24 w-4 bg-white/30 rounded-full"
            style={{ animation: 'compression-wave-propagate 3s linear infinite' }}
        ></div>
         <div 
            className="absolute top-1/2 -translate-y-1/2 left-10 h-24 w-4 bg-white/20 rounded-full"
            style={{ animation: 'compression-wave-propagate 3s linear infinite', animationDelay: '0.2s' }}
        ></div>

      </div>
      <p className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">Visualization: Piezoelectric Effect & Wave Propagation</p>
    </div>
  );
};

export default PhysicsDemo;
