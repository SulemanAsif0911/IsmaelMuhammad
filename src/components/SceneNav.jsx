import React from 'react';
import { useShop } from '../context/ShopContext';

export const SceneNav = ({ activeScene, onSelectScene }) => {
  const scenes = [
    { num: '01', name: 'The Forest', id: 'scene-hero' },
    { num: '02', name: 'Five-Nine', id: 'scene-forest' },
    { num: '03', name: 'Transition', id: 'scene-transition' },
    { num: '04', name: 'The Ocean', id: 'scene-ocean' },
    { num: '05', name: 'Most Wanted', id: 'scene-mostwanted' },
    { num: '06', name: 'Brand Story', id: 'scene-story' },
    { num: '07', name: 'Collections', id: 'scene-collections' },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start gap-4 select-none">
      {/* Current Scene Display */}
      <div className="flex items-baseline gap-1 text-xs font-mono text-[#d4af37] mb-2 pl-1">
        <span className="text-base font-bold tracking-wider">
          {activeScene < 10 ? `0${activeScene}` : activeScene}
        </span>
        <span className="text-white/30 text-[10px]">/ 07</span>
      </div>

      {/* Dots and Labels */}
      <div className="flex flex-col gap-3">
        {scenes.map((scene, idx) => {
          const sceneIndex = idx + 1;
          const isActive = activeScene === sceneIndex;

          return (
            <button
              key={scene.num}
              onClick={() => onSelectScene(sceneIndex, scene.id)}
              className="group flex items-center gap-3 text-left focus:outline-none transition-all py-1"
            >
              {/* Line / indicator */}
              <div
                className={`h-[1.5px] transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-8 bg-[#d4af37] shadow-[0_0_8px_#d4af37]'
                    : 'w-3 bg-white/25 group-hover:w-5 group-hover:bg-white/60'
                }`}
              />

              {/* Number & Name */}
              <div
                className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-white font-medium translate-x-1'
                    : 'text-white/30 group-hover:text-white/70'
                }`}
              >
                <span className="mr-1.5 opacity-50">{scene.num}</span>
                <span className="hidden xl:inline">{scene.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
