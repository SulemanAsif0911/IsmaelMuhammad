import React, { useState } from 'react';
import { Compass, Sparkles, Wind, Waves, Trees } from 'lucide-react';

export const TransitionSection = () => {
  // Interactive scrub transition slider (0 = Dense Forest, 100 = Open Waters)
  const [transitionProgress, setTransitionProgress] = useState(50);

  return (
    <section
      id="scene-transition"
      className="relative w-full min-h-[90vh] py-24 overflow-hidden flex items-center select-none bg-gradient-to-b from-[#07130d] via-[#1f2820] to-[#0a2330]"
    >
      {/* Background Panoramic Landscape: Lake, Mountains, Sunset Mist */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 filter brightness-90 contrast-105"
        style={{
          backgroundImage: `url('/images/environments/transition-panoramic.jpg')`,
        }}
      />

      {/* Foreground Terrain & Sparse Trees Layer (from FOREST TO OCEAN.png) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none mix-blend-screen opacity-75"
        style={{
          backgroundImage: `url('/images/environments/forest-to-ocean.png')`,
        }}
      />

      {/* Atmospheric Golden Sunset Lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07130d]/80 via-transparent to-[#0a2330]/90 pointer-events-none" />

      {/* Golden volumetric mist */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a2330] to-transparent pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-12">
        <div className="max-w-2xl ml-auto text-right space-y-4">
          {/* Eyebrow */}
          <div className="flex items-center justify-end gap-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#e2b057]">
              THE TRANSITION
            </span>
            <span className="w-6 h-[1px] bg-[#e2b057]/70" />
            <span className="font-mono text-sm text-white/40">03</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif-luxury text-4xl sm:text-6xl text-white font-light tracking-tight leading-tight">
            FROM FOREST <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#e8c87e] via-[#ffffff] to-[#7dd3fc]">
              TO OCEAN
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-md ml-auto pt-1">
            The journey continues, as nature transforms and reveals new depths. Ancient
            pines yield to open horizons and untamed waters.
          </p>

          {/* Interactive Landscape Transition Controller */}
          <div className="pt-6 inline-flex flex-col items-end space-y-2">
            <div className="flex items-center gap-3 text-[11px] font-mono text-white/60">
              <span className="flex items-center gap-1">
                <Trees className="w-3.5 h-3.5 text-[#22c55e]" /> Forest
              </span>
              <span className="text-white/30">→</span>
              <span className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-[#f59e0b]" /> Open Shore
              </span>
              <span className="text-white/30">→</span>
              <span className="flex items-center gap-1">
                <Waves className="w-3.5 h-3.5 text-[#38bdf8]" /> Deep Water
              </span>
            </div>

            {/* Slider */}
            <div className="w-64 sm:w-80 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <input
                type="range"
                min="0"
                max="100"
                value={transitionProgress}
                onChange={(e) => setTransitionProgress(Number(e.target.value))}
                className="w-full accent-[#d4af37] cursor-pointer"
              />
              <span className="text-[10px] font-mono text-[#d4af37]">
                {transitionProgress}%
              </span>
            </div>
            <p className="text-[9px] font-mono tracking-wider uppercase text-white/40">
              Scrub to adjust environmental horizon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
