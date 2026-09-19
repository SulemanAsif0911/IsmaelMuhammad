import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Hamza Farooq',
    location: 'Lahore, Pakistan',
    scent: 'FIVE-NINE',
    rating: 5,
    quote:
      'Five-Nine is easily one of the most sophisticated woody scents produced in Pakistan. The Atlas cedar and amber drydown easily lasts 12 hours on fabric. Exceptional quality.',
  },
  {
    name: 'Shahmeer Khan',
    location: 'Karachi, Pakistan',
    scent: 'NINE-FIVE',
    rating: 5,
    quote:
      'Living by the coast in Karachi, aquatic scents are essential. Nine-Five cuts through humidity like an ocean breeze and projects all day. The salty lemon note is magnificent.',
  },
  {
    name: 'Dr. Bilal Siddiqui',
    location: 'Islamabad, Pakistan',
    scent: 'CHARMING',
    rating: 5,
    quote:
      'The leather, saffron, and oud blend is genuinely regal. Wore it to an ambassador gala and received compliments all night. Proud to see Pakistani haute perfumery of this caliber.',
  },
  {
    name: 'Ayesha Malik',
    location: 'Rawalpindi, Pakistan',
    scent: 'CHEERFUL',
    rating: 5,
    quote:
      'The pink peonies and vanilla amber make this so feminine and uplifting. It has become my everyday signature scent. The packaging with the magnetic box is pure luxury.',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#070b09] py-20 border-t border-white/5">
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-mono tracking-[0.35em] text-gold-400 uppercase">
            Connoisseur Voices
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl text-white tracking-wider">
            CHERISHED ACROSS PAKISTAN
          </h2>
          <p className="text-xs text-neutral-400 font-sans max-w-md mx-auto">
            Over 50,000 bottles cherished by fragrance lovers from Karachi to Gilgit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 flex flex-col justify-between hover:border-gold-500/30 transition-all"
            >
              <div className="space-y-3">
                <div className="flex text-gold-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 font-sans font-light leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5">
                <div className="font-medium text-white text-xs">{t.name}</div>
                <div className="text-[10px] font-mono text-neutral-400">{t.location}</div>
                <div className="text-[10px] font-mono text-gold-400/90 mt-1 uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verified Purchase: {t.scent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
