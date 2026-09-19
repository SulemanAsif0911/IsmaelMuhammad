import React, { useState } from 'react';
import { ArrowRight, Sparkles, BookOpen, Award, Compass, HeartHandshake } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BrandStorySection = () => {
  const { navigateTo } = useShop();

  const chapters = [
    {
      id: 'beginning',
      title: 'THE BEGINNING',
      subtitle: 'Lahore, Old City & Olfactory Memory',
      text: 'Long before formulating bespoke extraits, Ismaeel was fascinated by the raw aromatic bazaars of Lahore. The intoxicating aroma of crushed damask roses in dew, smoky frankincense burning in courtyards, and aged dehn al oud in crystal vial collections sparked a lifelong obsession with scents.',
    },
    {
      id: 'passion',
      title: 'THE PASSION',
      subtitle: 'Authenticity & Community Voice',
      text: 'Starting with honest, uncompromising fragrance reviews and YouTube discussions, Ismaeel built a reputation for unmasking inflated designer marketing and dissecting true formulation quality. His viewers repeatedly requested one thing: "Give us the fragrance you would wear yourself."',
    },
    {
      id: 'craft',
      title: 'THE CRAFT',
      subtitle: 'French Oils & 90-Day Cold Maceration',
      text: 'Every creation begins with high-grade perfume compounds sourced directly from Grasse, France and Cambodia. We reject fast synthetic fixatives. Instead, our extracts undergo an extended 90-day cold maturation process, allowing deep resins, florals, and spices to meld seamlessly.',
    },
    {
      id: 'brand',
      title: 'THE BRAND',
      subtitle: 'Luxury Made Truthful',
      text: 'Ismaeel Muhammad Haute Parfumerie was founded on a simple truth: genuine luxury should be experienced through exceptional projection, pure sillage, and emotional depth—not exorbitant retailer markups.',
    },
    {
      id: 'future',
      title: 'THE FUTURE',
      subtitle: 'Bespoke Flacons & Global Horizons',
      text: 'From bespoke private atelier commissions in Pakistan to international discovery coffrets reaching collectors across London, Dubai, and New York, our mission remains anchored in poetic artistry and uncompromising raw ingredients.',
    },
  ];

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const activeChapter = chapters[activeChapterIndex];

  return (
    <section
      id="scene-story"
      className="relative w-full min-h-screen py-24 bg-[#0a0705] overflow-hidden flex items-center select-none border-t border-amber-950/40"
    >
      {/* Warm Ambient Atelier Background */}
      <div className="absolute inset-0 bg-radial-at-c from-[#26170c]/50 via-[#100a06]/90 to-black pointer-events-none" />

      {/* Subtle Bookshelf / Vintage Glow */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-white/40">06</span>
            <span className="w-6 h-[1px] bg-white/20" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d4af37]">
              OUR STORY
            </span>
          </div>

          <span className="hidden sm:inline font-mono text-xs text-white/40 uppercase tracking-widest">
            Atelier & Heritage
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Summary (matching MAIN IDEA.png) */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-tight">
              WHERE LOVE <br />
              <span className="italic font-normal text-gold-gradient">
                BECOMES PASSION
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              From a lifelong love for fragrances to a brand built on authenticity,
              Ismaeel Muhammad brings you scents that tell a story.
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('about')}
                className="group inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-[#d4af37] hover:text-[#f3de8a] transition-colors"
              >
                <span>LEARN MORE ABOUT THE ATELIER</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Quote Badge */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-amber-500/15 backdrop-blur-md">
              <p className="font-serif-luxury italic text-xs text-amber-200/90 leading-relaxed">
                “Fragrance isn’t simply worn. It is remembered. It anchors moments that time cannot erase.”
              </p>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mt-2">
                — Ismaeel Muhammad, Perfumer & Founder
              </span>
            </div>
          </div>

          {/* Center Column: Portrait of Ismaeel Muhammad (ismaeel-portrait.jpg) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-md w-full">
              {/* Outer Golden Border Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#d4af37]/30 via-transparent to-amber-600/20 blur-md group-hover:blur-lg transition-all duration-500" />

              <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl bg-black">
                <img
                  src="/images/story/ismaeel-portrait.jpg"
                  alt="Ismaeel Muhammad smelling fragrance test strip in perfume atelier"
                  className="w-full h-auto object-cover filter contrast-105 group-hover:scale-103 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37]">
                    Ismaeel Muhammad
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                    Nose & Creative Director
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Story Chapters (as shown in MAIN IDEA.png) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40 mb-3">
              Chapters of Creation
            </p>

            <div className="space-y-1.5">
              {chapters.map((ch, index) => {
                const isActive = activeChapterIndex === index;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapterIndex(index)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-300 border ${
                      isActive
                        ? 'bg-amber-950/30 border-[#d4af37]/60 shadow-lg'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-mono uppercase tracking-wider ${
                          isActive ? 'text-[#d4af37] font-semibold' : 'text-white/60'
                        }`}
                      >
                        {ch.title}
                      </span>
                      <span className="text-[10px] font-mono text-white/30">
                        0{index + 1}
                      </span>
                    </div>

                    {isActive && (
                      <p className="text-xs text-white/80 font-light leading-relaxed mt-2 pt-2 border-t border-white/10 animate-fadeIn">
                        {ch.text}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
