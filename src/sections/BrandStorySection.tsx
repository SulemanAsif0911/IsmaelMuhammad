import React, { useState } from 'react';
import { ArrowRight, BookOpen, Quote, Sparkles } from 'lucide-react';

interface BrandStorySectionProps {
  onLearnMore: () => void;
}

const STORY_CHAPTERS = [
  {
    id: 'beginning',
    title: 'THE BEGINNING',
    tag: 'Chapter I · Origins',
    content:
      'Born from a childhood passion in the historic lanes of Lahore, where the smell of rain hitting parched soil (petrichor) and traditional attar distillation sparked a lifelong obsession with perfumery.',
    quote: 'Fragrance isn’t simply worn. It is remembered long after words fade.'
  },
  {
    id: 'passion',
    title: 'THE PASSION',
    tag: 'Chapter II · The Scent Journey',
    content:
      'What began as sharing raw, unfiltered fragrance reviews with a community of thousands on YouTube soon transformed into a relentless desire to craft perfumes that hold their own against Paris and Milan.',
    quote: 'True luxury is never loud; it is unforgettable.'
  },
  {
    id: 'craft',
    title: 'THE CRAFT',
    tag: 'Chapter III · Formulation',
    content:
      'Every fragrance is composed with authentic French and Grasse essences, macerated patiently for a minimum of 45 to 60 days, ensuring unmatched longevity and complex olfactory development.',
    quote: 'We don’t rush time. We bottle its patience.'
  },
  {
    id: 'brand',
    title: 'THE BRAND',
    tag: 'Chapter IV · Haute Parfumerie',
    content:
      'Ismaeel Muhammad Haute Parfumerie was founded to bring uncompromising niche perfumery to Pakistan. No generic clones, no water-diluted formulas — only pure, evocative olfactory art.',
    quote: 'Rooted in heritage, designed for the world.'
  },
  {
    id: 'future',
    title: 'THE FUTURE',
    tag: 'Chapter V · Global Vision',
    content:
      'Expanding our signature extraits globally while preserving artisanal small-batch distillation. Our mission remains simple: making world-class signature scents accessible to every connoisseur.',
    quote: 'The journey of senses has only just begun.'
  }
];

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({
  onLearnMore
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const activeChapter = STORY_CHAPTERS[activeChapterIndex];

  return (
    <section
      id="phase-6"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0705] py-24 transition-colors duration-1000"
    >
      {/* Warm Ambient Atelier Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[2px]"
        style={{
          backgroundImage: `url('/assets/ismaeel-muhammad-founder.png')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0705]/95 to-black pointer-events-none" />

      {/* Warm Candlelight Bokeh Spots */}
      <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 rounded-full bg-gold-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-amber-900/30">
          <div className="flex items-center space-x-3">
            <span className="font-cinzel text-xs tracking-[0.3em] text-gold-400 font-bold">
              06
            </span>
            <span className="w-8 h-[1px] bg-amber-700/40" />
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-gold-300">
              OUR STORY
            </span>
          </div>

          <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:block">
            Maison Ismaeel Muhammad · Est. Pakistan
          </div>
        </div>

        {/* 3-Column Editorial Grid matching MAIN IDEA.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-12">
          {/* Left Column: Heading & Philosophy */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-gold-400">
                ISMAEEL MUHAMMAD
              </span>
              <h2 className="font-cinzel text-3xl sm:text-5xl text-white tracking-[0.08em] leading-tight">
                WHERE LOVE <br />
                <span className="italic font-serif text-gold-300">
                  BECOMES PASSION
                </span>
              </h2>
            </div>

            <p className="text-sm text-neutral-300 font-sans font-light leading-relaxed">
              From a lifelong love for fragrances to a brand built on authenticity,
              Ismaeel Muhammad brings you scents that tell a story.
            </p>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-gold-500/20 backdrop-blur-sm relative">
              <Quote className="w-5 h-5 text-gold-400/50 mb-2" />
              <p className="font-serif italic text-base text-gold-200/90 leading-snug">
                "{activeChapter.quote}"
              </p>
              <span className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mt-2">
                — Ismaeel Muhammad, Perfumer & Founder
              </span>
            </div>

            <div>
              <button
                onClick={onLearnMore}
                className="group inline-flex items-center space-x-3 px-6 py-3 rounded bg-gold-500/20 hover:bg-gold-500/30 border border-gold-400/50 text-gold-200 text-xs font-mono tracking-[0.2em] uppercase transition-all"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Center Column: Portrait of Ismaeel Muhammad Testing Scent Blotter */}
          <div className="lg:col-span-4 flex justify-center items-center py-4">
            <div className="relative group max-w-sm rounded-2xl overflow-hidden border border-gold-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Golden Frame Accent */}
              <div className="absolute inset-0 border border-gold-400/20 m-2 rounded-xl pointer-events-none z-10" />

              <img
                src="/assets/ismaeel-muhammad-founder.png"
                alt="Ismaeel Muhammad Testing Scent Strips"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
                <span className="text-[10px] font-mono tracking-widest text-gold-300 uppercase block">
                  The Perfumer's Desk
                </span>
                <span className="text-xs text-neutral-300 font-sans">
                  Testing macerated raw essences · Studio Atelier
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Story Chapters */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-[10px] font-mono tracking-[0.25em] text-gold-400 uppercase mb-2">
              STORY CHAPTERS
            </div>

            <div className="space-y-2">
              {STORY_CHAPTERS.map((ch, idx) => {
                const isActive = idx === activeChapterIndex;
                return (
                  <div
                    key={ch.id}
                    className={`rounded-xl transition-all duration-300 overflow-hidden border ${
                      isActive
                        ? 'bg-amber-950/40 border-gold-400/60 shadow-[0_0_20px_rgba(212,176,55,0.15)]'
                        : 'bg-black/30 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <button
                      onClick={() => setActiveChapterIndex(idx)}
                      className="w-full p-3.5 text-left flex items-center justify-between focus:outline-none"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isActive ? 'text-gold-400' : 'text-neutral-500'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          className={`font-cinzel text-sm tracking-wider uppercase ${
                            isActive ? 'text-white font-semibold' : 'text-neutral-300'
                          }`}
                        >
                          {ch.title}
                        </span>
                      </div>
                      <span className="text-gold-400 font-mono text-sm">
                        {isActive ? '—' : '+'}
                      </span>
                    </button>

                    {isActive && (
                      <div className="px-4 pb-4 pt-1 text-xs text-neutral-300 font-sans font-light leading-relaxed border-t border-white/5 animate-fadeIn">
                        {ch.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
