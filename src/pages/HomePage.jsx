import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { SceneNav } from '../components/SceneNav';
import { HeroOpening } from '../sections/HeroOpening';
import { ForestSection } from '../sections/ForestSection';
import { TransitionSection } from '../sections/TransitionSection';
import { OceanSection } from '../sections/OceanSection';
import { MostWantedSection } from '../sections/MostWantedSection';
import { BrandStorySection } from '../sections/BrandStorySection';
import { CollectionsSection } from '../sections/CollectionsSection';

export const HomePage = () => {
  const { activeScene, setActiveScene } = useShop();

  // Scroll listener to update activeScene based on viewport position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      const scenes = [
        { id: 'scene-hero', index: 1 },
        { id: 'scene-forest', index: 2 },
        { id: 'scene-transition', index: 3 },
        { id: 'scene-ocean', index: 4 },
        { id: 'scene-mostwanted', index: 5 },
        { id: 'scene-story', index: 6 },
        { id: 'scene-collections', index: 7 },
      ];

      for (let i = scenes.length - 1; i >= 0; i--) {
        const el = document.getElementById(scenes[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveScene(scenes[i].index);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveScene]);

  const scrollToScene = (sceneIndex, elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveScene(sceneIndex);
    }
  };

  const handleScrollToNext = () => {
    scrollToScene(2, 'scene-forest');
  };

  return (
    <div className="relative w-full bg-[#050907]">
      {/* Floating Scene Indicator (01 / 07, etc.) */}
      <SceneNav activeScene={activeScene} onSelectScene={scrollToScene} />

      {/* PHASE 01: The Opening (Forest, Amber Bottle, 3D Depth) */}
      <HeroOpening onScrollDown={handleScrollToNext} />

      {/* PHASE 02: Forest Fragrances (Five-Nine, Accords, Carousel) */}
      <ForestSection />

      {/* PHASE 03: Forest to Ocean Landscape Transition */}
      <TransitionSection />

      {/* PHASE 04: The Ocean (Beneath the Surface, Depth Markers) */}
      <OceanSection />

      {/* PHASE 05: Most Wanted (Underwater 4 Suspended Bottles & Corals) */}
      <MostWantedSection />

      {/* PHASE 06: Brand Story (Where Love Becomes Passion) */}
      <BrandStorySection />

      {/* PHASE 07: Collections (Men, Women, Attars, Discovery Set) */}
      <CollectionsSection />
    </div>
  );
};
