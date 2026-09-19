import React, { useState } from 'react';
import { ArrowDown, Compass, Droplets } from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';

interface TransitionSectionProps {
  onDiveDeeper: () => void;
}

export const TransitionSection: React.FC<TransitionSectionProps> = ({
  onDiveDeeper
}) => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section
      id="phase-3"
      className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden transition-colors duration-1000"
      style={{
        background: 'linear-gradient(180deg, #18291c 0%, #3a473b 25%, #6e7669 50%, #204153 75%, #071f2d 100%)',
      }}
    >
      {/* Background Mountain Shoreline Panorama */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 filter brightness-95"
        style={{
          backgroundImage: `url('/assets/transition-landscape.png')`,
        }}
      />

      {/* Foreground Mountain Path Layer with Alpha Transparency */}
      <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-multiply">
        <img
          src="/assets/forest-to-ocean-alpha.png"
          alt="Transition Path"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Atmospheric warm golden sunset & mist gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2330] via-transparent to-[#18291c]/80 pointer-events-none" />

      {/* Subtle warm sunset particles */}
      <ParticleCanvas mode="transition" density={25} className="z-10" />

      {/* Section Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 py-20 text-center flex flex-col items-center">
        {/* Phase Badge */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="font-cinzel text-xs tracking-[0.3em] text-sand-300 font-bold">
            03
          </span>
          <span className="w-8 h-[1px] bg-sand-300/40" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-sand-200">
            THE TRANSITION
          </span>
        </div>

        <h2 className="font-cinzel text-4xl sm:text-6xl text-white tracking-[0.1em] mb-4">
          FROM FOREST <br />
          <span className="italic font-serif text-sand-200">TO OCEAN</span>
        </h2>

        <p className="max-w-xl text-sm sm:text-base text-neutral-200 font-sans font-light leading-relaxed mb-8">
          The journey continues as nature transforms. Ancient pines yield to open stone shores,
          where the whispering wind meets the salt spray of endless waters.
        </p>

        {/* Environmental Metamorphosis Bar */}
        <div className="w-full max-w-md bg-black/60 backdrop-blur-md border border-white/15 rounded-xl p-4 mb-8 shadow-2xl">
          <div className="flex justify-between text-[10px] font-mono tracking-widest text-neutral-300 uppercase mb-2">
            <span className="text-emerald-400">Dense Forest</span>
            <span className="text-sand-300">Open Shore</span>
            <span className="text-cyan-400">Deep Waters</span>
          </div>

          <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-emerald-800 via-amber-600 to-cyan-500 overflow-hidden">
            <div
              className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#fff] transition-all duration-300"
              style={{ left: `${sliderPos}%` }}
            />
          </div>

          <div className="flex justify-center gap-4 mt-3">
            <button
              onClick={() => setSliderPos(15)}
              className="text-[9px] font-mono text-emerald-300 hover:text-white uppercase transition-colors"
            >
              Woods
            </button>
            <button
              onClick={() => setSliderPos(50)}
              className="text-[9px] font-mono text-sand-300 hover:text-white uppercase transition-colors"
            >
              Horizon
            </button>
            <button
              onClick={() => setSliderPos(85)}
              className="text-[9px] font-mono text-cyan-300 hover:text-white uppercase transition-colors"
            >
              Reef
            </button>
          </div>
        </div>

        {/* Action Button: Dive Deeper */}
        <button
          onClick={onDiveDeeper}
          className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-200 hover:text-white text-xs font-mono tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]"
        >
          <Droplets className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
          <span>DIVE INTO THE OCEAN</span>
          <ArrowDown className="w-4 h-4 text-cyan-300 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
