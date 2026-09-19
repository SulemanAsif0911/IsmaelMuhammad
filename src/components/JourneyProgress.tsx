import React, { useEffect, useState } from 'react';

interface JourneyProgressProps {
  activePhase: number;
  onSelectPhase: (phaseIndex: number) => void;
}

const PHASES = [
  { num: '01', title: 'The Opening', label: 'A Journey of Senses' },
  { num: '02', title: 'The Forest', label: 'Five-Nine Collection' },
  { num: '03', title: 'The Transition', label: 'Forest to Ocean' },
  { num: '04', title: 'The Ocean', label: 'Beneath the Surface' },
  { num: '05', title: 'Most Wanted', label: 'Depths Revealed' },
  { num: '06', title: 'Our Story', label: 'Love Becomes Passion' },
  { num: '07', title: 'Collections', label: 'Artisanal Portals' },
];

export const JourneyProgress: React.FC<JourneyProgressProps> = ({
  activePhase,
  onSelectPhase
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center select-none"
      aria-label="Journey Progress"
    >
      {/* Current Phase Big Counter */}
      <div className="mb-4 text-center">
        <span className="font-cinzel text-xs tracking-[0.3em] text-gold-400 font-bold block">
          0{activePhase}
        </span>
        <span className="text-[9px] font-mono tracking-widest text-neutral-500">
          / 07
        </span>
      </div>

      {/* Progress Track Bar */}
      <div className="relative w-[2px] h-48 bg-white/10 rounded-full overflow-hidden my-2">
        <div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-gold-400 via-emerald-400 to-cyan-400 rounded-full transition-all duration-300"
          style={{ height: `${Math.min(100, Math.max(5, scrollProgress))}%` }}
        />
      </div>

      {/* Interactive Phase Dots */}
      <div className="flex flex-col space-y-3 mt-4">
        {PHASES.map((phase, idx) => {
          const phaseNum = idx + 1;
          const isActive = activePhase === phaseNum;

          return (
            <button
              key={phase.num}
              onClick={() => onSelectPhase(phaseNum)}
              className="group relative flex items-center focus:outline-none"
              title={`${phase.num} — ${phase.title}`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-gold-400 scale-125 shadow-[0_0_8px_rgba(212,176,55,0.8)]'
                    : 'bg-white/20 group-hover:bg-white/60'
                }`}
              />

              {/* Tooltip on hover */}
              <div className="absolute left-6 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2.5 py-1 rounded bg-black/85 backdrop-blur-md border border-white/10 text-[10px] tracking-wider text-neutral-300 font-sans shadow-lg">
                <span className="text-gold-400 font-mono mr-1.5">{phase.num}</span>
                {phase.title}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
