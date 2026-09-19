import React from 'react';
import { Award, Compass, Heart, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutPage = () => {
  const { navigateTo } = useShop();

  const milestones = [
    {
      year: 'THE BEGINNING',
      title: 'Roots in the Old City of Lahore',
      text: 'Surrounded by generational attar vendors, spice merchants, and historical rose distillation stills in Lahore, Ismaeel developed an innate reverence for natural aromatics and raw extraction purity.',
    },
    {
      year: 'THE PASSION',
      title: 'The YouTube Voice of Authenticity',
      text: 'Frustrated by mass-market commercial releases diluted with cheap fixatives, Ismaeel launched his fragrance channel to educate perfume lovers on real concentration percentages and note pyramids.',
    },
    {
      year: 'THE CRAFT',
      title: 'Grasse Partnerships & 90-Day Cold Maceration',
      text: 'Rather than rushing production, Ismaeel Muhammad perfumes undergo strict cold maceration protocols in temperature-controlled glass carboys for 60 to 90 days, enabling harmonious olfactory sillage.',
    },
    {
      year: 'THE BRAND',
      title: 'Haute Parfumerie with Honest Values',
      text: 'The brand was officially unveiled to offer genuine Extrait de Parfum strength (25% - 32% pure oil) directly to fragrance connoisseurs without middleman retail inflations.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b09] text-white pt-28 pb-24">
      {/* Editorial Hero */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-20">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#d4af37]">
            The Maison Ethos
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl text-white font-light tracking-tight leading-tight">
            THE STORY BEHIND <br />
            <span className="italic font-normal text-gold-gradient">THE SCENT</span>
          </h1>
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed pt-2">
            “Perfume is not an accessory you put on. It is an emotional landscape you enter.
            When crafted with integrity, a fragrance will outlast memory itself.”
          </p>
        </div>
      </div>

      {/* Large Portrait & Atelier Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-2xl">
              <img
                src="/images/story/ismaeel-portrait.jpg"
                alt="Ismaeel Muhammad in his study"
                className="w-full h-auto object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                  Ismaeel Muhammad
                </span>
                <p className="font-serif-luxury text-lg text-white">
                  Founder & Master Nose, Lahore Atelier
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              <p>
                In an era dominated by hyper-accelerated industrial perfumery, Ismaeel Muhammad founded
                his eponymous maison to preserve the lost art of patient, ingredient-first formulation.
              </p>
              <p>
                Every formulation in our vault begins with direct ethical partnerships: wild agarwood from
                Cambodia and Assam, Damask roses harvested at daybreak in Ispahan, bergamot hand-pressed
                in Calabria, and pure ambergris gathered from pelagic shorelines.
              </p>
              <p>
                We do not formulate to chase ephemeral market trends. We formulate scents that command
                silence, trigger visceral nostalgia, and forge unforgettable scent memories.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="font-mono text-2xl text-[#d4af37] font-bold">30%+</span>
                <p className="text-[11px] font-mono text-white/50 uppercase mt-1">
                  Extrait Oil Concentration
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="font-mono text-2xl text-[#d4af37] font-bold">90 Days</span>
                <p className="text-[11px] font-mono text-white/50 uppercase mt-1">
                  Cold Maturation Period
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars of Craft */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4af37]">
            The Four Pillars
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white mt-1">
            Uncompromising Craftsmanship
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-colors space-y-3"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] block">
                {m.year}
              </span>
              <h3 className="font-serif-luxury text-xl text-white">{m.title}</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Experience */}
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white">
          Enter The Fragrance Journey
        </h3>
        <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
          Experience our creations through the scroll-driven environmental journey or visit
          our private boutique atelier.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#d4af37] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#e4bf46] transition-colors shadow-xl"
        >
          <span>Begin The Sensory Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
