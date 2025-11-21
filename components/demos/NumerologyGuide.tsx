import React from 'react';

const NumerologyGuide: React.FC = () => {
  return (
    <div className="w-full rounded-lg bg-gray-900/50 border border-white/10 p-6 text-white/80">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-blue-300">✍️ Section 2: Numbers That Require Birth Time</h2>
        <p className="text-sm text-white/70 italic">
          This section focuses on numbers, insights, and energetic patterns that need an accurate birth time — ideally including location — to achieve precise alignment, especially when fusing Numerology + Astrology or working with GG33 hybrid systems.
        </p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold border-b border-white/20 pb-2 mb-4">🕰️ SECTION 2 – Numbers That Require Birth Time</h3>
          
          <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg mb-6">
            <h4 className="font-bold text-red-300 not-prose">🚨 Why Birth Time Matters:</h4>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Determines your Ascendant and houses in astrology</li>
              <li>Influences planetary placements and timing cycles</li>
              <li>Adds depth and precision to timing-based numerology, including karmic patterns and soul contracts</li>
              <li>Used in GG33-style power mapping, where numbers are synced with cosmic energy</li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-8">
              {/* 1. Astro-Numerology */}
              <div>
                  <h4 className="text-lg font-bold text-teal-300 not-prose">🔵 1. Astro-Numerology Fusion Insights</h4>
                  <p className="mt-1">These calculations blend numerology and astrology, requiring both your birth time and location.</p>
                  <div className="pl-4 mt-2 space-y-3">
                      <h5 className="font-semibold">Ascendant-Based Numerology Interpretations</h5>
                      <p>Blends your Life Path, Expression, or Soul Urge with your rising sign for enhanced self-image decoding.</p>
                      <p><strong>Why it matters:</strong> The rising sign changes every 2 hours — without it, the fusion becomes inaccurate.</p>
                      <div className="p-3 bg-gray-800/50 rounded-md text-sm not-prose"><strong className="text-yellow-300">GG33 Insight:</strong> Certain Life Path + Ascendant combos (e.g., LP7 + Scorpio Rising) create powerfully focused or manipulative archetypes.</div>
                      
                      <h5 className="font-semibold mt-4">Planetary Numerology Assignments</h5>
                      <p>Ties numerology to your ruling planet (e.g., Mars = 9, Venus = 6) based on planetary placements at birth.</p>
                      <p><strong>Used For:</strong></p>
                      <ul className="list-disc list-inside ml-4">
                          <li>Matching number energy to planetary influence</li>
                          <li>Reading wealth/karma potential through a planetary lens</li>
                      </ul>
                       <div className="p-3 bg-gray-800/50 rounded-md text-sm not-prose"><strong className="text-yellow-300">GG33 Insight:</strong> Planet + Number = more accurate life purpose and challenge archetype.</div>
                  </div>
              </div>

              {/* 2. Ruling Number */}
              <div>
                  <h4 className="text-lg font-bold text-red-300 not-prose">🔴 2. Ruling Number (Esoteric / Egyptian Numerology)</h4>
                  <p className="mt-1">Some systems (Egyptian or GG33-influenced) use ruling numbers based on birth time + astrological overlays. Not commonly used in Pythagorean systems, but powerful when fused with the Chinese Zodiac and planetary cycles.</p>
                  <p className="mt-2"><strong>Why it matters:</strong> Your Ruling Number acts like an “energetic DNA anchor” — similar to a soul signature.</p>
              </div>

              {/* 3. Pinnacle Cycle */}
              <div>
                  <h4 className="text-lg font-bold text-orange-300 not-prose">🟠 3. Pinnacle Cycle Fine-Tuning</h4>
                  <p className="mt-1">Pinnacle Numbers usually rely on date of birth only — but for hyper-precise life phase mapping, birth time matters.</p>
                  <p className="mt-2"><strong>Why?:</strong> If you're born near midnight or cusp dates, your pinnacle transitions may be one year earlier or later.</p>
                  <div className="p-3 bg-gray-800/50 rounded-md text-sm not-prose"><strong className="text-yellow-300">GG33 Insight:</strong> When fine-tuned with time, pinnacle transitions become accurate energy shifts — useful for knowing when to launch, leave, or level up.</div>
              </div>
              
               {/* 4. Essence Numbers */}
              <div>
                  <h4 className="text-lg font-bold text-yellow-300 not-prose">🟡 4. Essence Numbers (Time-Sensitive Life Themes)</h4>
                  <p className="mt-1">Track year-by-year energy themes based on full name and age.</p>
                  <p className="mt-2"><strong>Why birth time helps:</strong> Your exact birth hour aligns essence shifts with solar returns, amplifying precision in forecasting.</p>
              </div>

               {/* 5. House Overlays */}
              <div>
                  <h4 className="text-lg font-bold text-purple-300 not-prose">🟣 5. Numerology House Overlays (Experimental)</h4>
                  <p className="mt-1">Some advanced systems assign numerology numbers to astrological houses, using your birth chart as a canvas. E.g., Life Path 7 in the 8th house = spiritual awakening through power, sex, or death.</p>
                  <p className="mt-2"><strong>Why it matters:</strong> House placement needs birth time to work — without it, you can’t map energy across your life domains.</p>
              </div>
              
              {/* 6. Soul Contract */}
              <div>
                  <h4 className="text-lg font-bold text-gray-300 not-prose">⚫ 6. Soul Contract Activation Timing</h4>
                  <p className="mt-1">Certain numerology energies “activate” at specific ages — often tied to transits, name changes, or pivotal events.</p>
                  <p className="mt-2"><strong>Birth time aligns:</strong></p>
                   <ul className="list-disc list-inside ml-4">
                      <li>Age of spiritual awakening</li>
                      <li>Karmic tests</li>
                      <li>Initiation periods (GG33 energy gates)</li>
                  </ul>
                  <div className="p-3 bg-gray-800/50 rounded-md text-sm mt-2 not-prose"><strong className="text-yellow-300">GG33 Insight:</strong> Timing is everything — many people hit karmic loops or breakthroughs in specific master number years (11, 22, 33, etc.).</div>
              </div>
              
              {/* 7. Reincarnation */}
              <div>
                  <h4 className="text-lg font-bold text-cyan-300 not-prose">🧿 7. Reincarnation Coding & Karmic Gates</h4>
                  <p className="mt-1">Interprets when (and sometimes how) karmic debts are repaid, based on previous lives and soul evolution.</p>
                  <p className="mt-2"><strong>Why birth time matters:</strong> Karmic lessons align with transits and degrees that change hourly.</p>
                  <p><strong>Used for:</strong></p>
                   <ul className="list-disc list-inside ml-4">
                      <li>Karmic timing cycles</li>
                      <li>Identifying repeating life patterns</li>
                      <li>Guiding ancestral or soul-clearing work</li>
                  </ul>
              </div>
          </div>
          
          {/* Summary Table */}
          <div className="mt-10 not-prose">
              <h3 className="text-xl font-semibold border-b border-white/20 pb-2 mb-4">🧭 Section Summary Table</h3>
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                      <thead>
                          <tr className="bg-gray-800/50">
                              <th className="p-3 border border-white/20">🔢 Number / System</th>
                              <th className="p-3 border border-white/20">🕒 Needs Birth Time?</th>
                              <th className="p-3 border border-white/20">🧠 Why?</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="border-b border-white/10"><td className="p-3 border border-white/20">Life Path, Soul Urge, etc.</td><td className="p-3 border border-white/20">❌ No</td><td className="p-3 border border-white/20">Based on name/date only</td></tr>
                          <tr className="border-b border-white/10 bg-black/20"><td className="p-3 border border-white/20">Astro-Numerology (Ascendant fusion)</td><td className="p-3 border border-white/20">✅ Yes</td><td className="p-3 border border-white/20">Needs rising sign</td></tr>
                          <tr className="border-b border-white/10"><td className="p-3 border border-white/20">Planetary Numerology</td><td className="p-3 border border-white/20">✅ Yes</td><td className="p-3 border border-white/20">Planet placements depend on time</td></tr>
                          <tr className="border-b border-white/10 bg-black/20"><td className="p-3 border border-white/20">Pinnacle Fine-Tuning</td><td className="p-3 border border-white/20">⚠️ Optional</td><td className="p-3 border border-white/20">Sharpens timing accuracy</td></tr>
                          <tr className="border-b border-white/10"><td className="p-3 border border-white/20">Essence Number Forecasting</td><td className="p-3 border border-white/20">⚠️ Optional</td><td className="p-3 border border-white/20">Aligns with solar return</td></tr>
                          <tr className="border-b border-white/10 bg-black/20"><td className="p-3 border border-white/20">Ruling Number (Esoteric)</td><td className="p-3 border border-white/20">✅ Yes</td><td className="p-3 border border-white/20">Based on complex timing</td></tr>
                          <tr className="border-b border-white/10"><td className="p-3 border border-white/20">Soul Contract Timing</td><td className="p-3 border border-white/20">✅ Yes</td><td className="p-3 border border-white/20">Tracks karmic events</td></tr>
                          <tr className="border-b border-white/10 bg-black/20"><td className="p-3 border border-white/20">House-Based Numerology (Advanced)</td><td className="p-3 border border-white/20">✅ Yes</td><td className="p-3 border border-white/20">Needs full birth chart</td></tr>
                          <tr className="border-b border-white/10"><td className="p-3 border border-white/20">Karmic Rebirth Windows</td><td className="p-3 border border-white/20">✅ Yes</td><td className="p-3 border border-white/20">Reincarnation gates are time-coded</td></tr>
                      </tbody>
                  </table>
              </div>
          </div>

          {/* Takeaway */}
          <div className="mt-8 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg not-prose">
            <h4 className="font-bold text-blue-300">🧠 Quick Takeaway:</h4>
            <p className="mt-2">Birth time is not essential for most core numbers, but it becomes critical when you're decoding:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Planetary/astrological influence on numbers</li>
              <li>Timing life events with karmic precision</li>
              <li>Fusion systems (GG33-style, Chinese Zodiac overlays, power windows)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumerologyGuide;
