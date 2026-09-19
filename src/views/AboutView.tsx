import React from 'react';
import { Sparkles, Compass, Award, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onExploreFragrances: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onExploreFragrances }) => {
  return (
    <div className="min-h-screen bg-[#070B08] text-[#E8E6E1] pt-28 pb-24 selection:bg-gold-500/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold-400 font-mono">
            Haute Parfumerie · Lahore, Pakistan
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-wide">
            Where Love Becomes Passion
          </h1>
          <p className="font-serif text-lg sm:text-xl text-gold-200/80 italic">
            "Fragrance is not merely worn. It is remembered."
          </p>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4"></div>
        </div>

        {/* Founder Portrait & Intimate Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="/images/brand/founder_ismaeel.jpg"
                alt="Founder Ismaeel Muhammad in his fragrance apothecary studio"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-lg text-white font-medium">Ismaeel Muhammad</p>
                <p className="text-xs text-gold-400 tracking-wider uppercase font-mono">
                  Founder & Artistic Director
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
              The Journey of a Connoisseur
            </h2>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              Ismaeel Muhammad’s relationship with perfumery began not as a commercial venture, but as an obsession with memory, emotion, and sensory truth. As one of Pakistan’s most respected fragrance educators and connoisseurs, he spent years evaluating thousands of rare niche fragrances, deconstructing accords, and connecting directly with fragrance lovers across the globe.
            </p>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              Frustrated by mass-market commercial fragrances diluted with excessive alcohol and synthetic fixatives, Ismaeel founded his eponymous perfume house with a single uncompromising rule: 
              <strong className="text-gold-300 font-serif font-normal italic text-base block mt-2">
                "Formulate without commercial compromise. Use genuine high-grade extracts, celebrate regional heritage, and bottle at concentrations that last all day."
              </strong>
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="font-serif text-3xl text-gold-300">30%</p>
                <p className="text-xs text-white/50 tracking-wider uppercase mt-1">Average Extrait Concentration</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-gold-300">100%</p>
                <p className="text-xs text-white/50 tracking-wider uppercase mt-1">Authentic Sourced Materials</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Chapters of the Brand */}
        <div className="space-y-12 border-t border-white/10 pt-16">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-mono">Our Pillars</span>
            <h3 className="font-serif text-3xl text-white mt-1">The Five Chapters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                num: '01',
                title: 'The Beginning',
                desc: 'Born from countless hours of smelling raw distillations and building a passionate community around olfactory education.',
              },
              {
                num: '02',
                title: 'The Passion',
                desc: 'Every perfume tells an emotional narrative—from dewy morning pines to deep abyss marine silence.',
              },
              {
                num: '03',
                title: 'The Craft',
                desc: 'Raw concentrates sourced directly from Grasse, Taif, Cambodia, and Calabria. Blended and aged for optimal maceration.',
              },
              {
                num: '04',
                title: 'The Brand',
                desc: 'A proud Pakistani luxury house proving our formulations and bottle craftsmanship match any European haute perfumery.',
              },
              {
                num: '05',
                title: 'The Future',
                desc: 'Exporting our olfactory heritage worldwide while pioneering sustainable botanical extraction methods.',
              },
            ].map((chapter) => (
              <div
                key={chapter.num}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold-400/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-gold-400 tracking-widest block mb-2">
                    {chapter.num}
                  </span>
                  <h4 className="font-serif text-lg text-white font-medium mb-2 uppercase">
                    {chapter.title}
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    {chapter.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Studio & Atelier Callout */}
        <div className="rounded-3xl bg-gradient-to-r from-[#101A13] via-[#0B150F] to-[#0A110D] border border-white/10 p-8 sm:p-12 text-center space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-mono">
            Bespoke Atelier Experience
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-white max-w-xl mx-auto font-light">
            Experience Our Fragrances In Person
          </h3>
          <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto leading-relaxed">
            Visit our private fragrance studio in Lahore for an intimate scent discovery consultation with our master nose.
          </p>
          <button
            onClick={onExploreFragrances}
            className="px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all inline-flex items-center space-x-2"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
