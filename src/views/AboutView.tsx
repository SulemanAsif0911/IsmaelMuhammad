import React from 'react';
import { Quote, Sparkles, Award, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onStartJourney: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onStartJourney }) => {
  return (
    <div className="min-h-screen bg-[#050807] text-white pt-28 pb-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
        {/* Hero */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-mono tracking-[0.35em] text-gold-400 uppercase">
            Maison Ismaeel Muhammad
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl text-white tracking-[0.08em] leading-tight">
            THE STORY BEHIND <br />
            <span className="italic font-serif text-gold-300">THE SCENT</span>
          </h1>
          <p className="text-sm text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            "We believe fragrance is an invisible second skin — an indelible emotional imprint
            that speaks when words are silent."
          </p>
        </div>

        {/* Founder Portrait & Manifesto */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl">
              <img
                src="/assets/ismaeel-muhammad-founder.png"
                alt="Ismaeel Muhammad in Studio"
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-black/80 border-t border-white/10 text-center">
                <span className="font-cinzel text-sm text-white font-semibold block">
                  Ismaeel Muhammad
                </span>
                <span className="text-[10px] font-mono text-gold-400 uppercase">
                  Perfumer & Creative Director
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 space-y-5">
            <h2 className="font-cinzel text-2xl sm:text-3xl text-white font-semibold">
              Rooted in Authenticity
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
              Before launching this house, Ismaeel spent years reviewing hundreds of global fragrances,
              deconstructing olfactive pyramids, and connecting with thousands of perfume lovers across Pakistan.
            </p>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
              He discovered a glaring void: the market was overwhelmed by synthetic clones that disintegrated
              in the warm Pakistani climate, or exorbitant imported niche houses charging exorbitant markups.
            </p>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
              Ismaeel Muhammad set out with one stubborn mandate: import premier Grasse and Parisian raw concentrates,
              macerate them at high perfume concentrations (25% to 35%), and bottle them in bespoke flacons at fair, accessible pricing.
            </p>
          </div>
        </div>

        {/* The Pillars of Craft */}
        <div className="space-y-8 pt-8 border-t border-white/10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-[0.3em] text-gold-400 uppercase">
              The Architecture of Quality
            </span>
            <h3 className="font-cinzel text-3xl text-white">THE FOUR PILLARS</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <span className="font-cinzel text-xl text-gold-400 font-bold block">01</span>
              <h4 className="font-cinzel text-base text-white font-semibold">Grasse & French Oils</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                We refuse cheap aroma-chemicals. Every drop of essential oil is ethically sourced from legendary distilling regions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <span className="font-cinzel text-xl text-emerald-400 font-bold block">02</span>
              <h4 className="font-cinzel text-base text-white font-semibold">60-Day Maceration</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Raw oils and natural alcohol are aged in temperature-controlled dark rooms to achieve velvety smoothness without harsh alcohol spikes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <span className="font-cinzel text-xl text-cyan-400 font-bold block">03</span>
              <h4 className="font-cinzel text-base text-white font-semibold">Beast Mode Longevity</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Formulated specifically to overcome high heat and humidity, ensuring 10–14+ hours of genuine sillage.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <span className="font-cinzel text-xl text-amber-400 font-bold block">04</span>
              <h4 className="font-cinzel text-base text-white font-semibold">Eastern Heritage</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                A deep respect for traditional hydro-distilled Attars, precious Cambodi and Assam agarwood, and royal Kashmiri saffron.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <button
            onClick={onStartJourney}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-cinzel text-xs tracking-[0.25em] uppercase font-bold transition-all shadow-xl"
          >
            ENTER THE JOURNEY OF SENSES →
          </button>
        </div>
      </div>
    </div>
  );
};
