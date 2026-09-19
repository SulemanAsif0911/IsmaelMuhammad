import React from 'react';

interface SceneHUDProps {
  currentScene: number; // 1 to 7
  scrollPercent: number; // 0 to 100
  onJumpToScene: (sceneIndex: number) => void;
}

const SCENE_NAMES = [
  { index: 1, id: 'hero', name: 'The Awakening' },
  { index: 2, id: 'forest', name: 'The Forest' },
  { index: 3, id: 'transition', name: 'The Transition' },
  { index: 4, id: 'ocean', name: 'The Ocean' },
  { index: 5, id: 'most-wanted', name: 'Most Wanted' },
  { index: 6, id: 'story', name: 'Our Story' },
  { index: 7, id: 'collections', name: 'Collections' },
];

export const SceneHUD: React.FC<SceneHUDProps> = ({
  currentScene,
  scrollPercent,
  onJumpToScene,
}) => {
  return (
    <aside 
      aria-label="Scene progress navigation" 
      className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end space-y-4 pointer-events-auto select-none"
    >
      {/* Scroll percentage indicator */}
      <div className="text-[10px] tracking-[0.25em] text-gold-400/80 font-mono mb-1">
        0{currentScene} / 07
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative flex flex-col space-y-3 items-end">
        {SCENE_NAMES.map((s) => {
          const isActive = currentScene === s.index;
          return (
            <button
              key={s.id}
              onClick={() => onJumpToScene(s.index)}
              className="group flex items-center space-x-3 text-right focus:outline-none transition-all py-1"
              title={`Jump to Scene 0${s.index}: ${s.name}`}
            >
              {/* Scene Label on Hover */}
              <span
                className={`text-[9px] tracking-[0.25em] uppercase font-sans transition-all duration-300 ${
                  isActive
                    ? 'text-gold-300 opacity-100 font-semibold'
                    : 'text-white/40 opacity-0 group-hover:opacity-100 group-hover:text-white/80'
                }`}
              >
                {s.name}
              </span>

              {/* Dot indicator */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-gold-400 ring-4 ring-gold-400/20 scale-125'
                    : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-gold-400/60 group-hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Slim progress bar */}
      <div className="w-0.5 h-16 bg-white/10 rounded-full overflow-hidden mt-2 relative">
        <div
          className="w-full bg-gold-400 transition-all duration-150"
          style={{ height: `${Math.min(100, Math.max(5, scrollPercent))}%` }}
        />
      </div>
    </aside>
  );
};
