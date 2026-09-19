import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Category } from '../types';

interface CollectionsSectionProps {
  onSelectCategory: (category: Category) => void;
  onViewAll: () => void;
}

const COLLECTION_PORTALS = [
  {
    category: 'Men' as Category,
    title: 'MEN',
    subtitle: 'BOLD & TIMELESS',
    desc: 'Smoky cedarwoods, leather, dark amber, and fresh sea breezes.',
    image: '/assets/col-men.png',
    accent: 'border-slate-500/40 hover:border-slate-400',
  },
  {
    category: 'Women' as Category,
    title: 'WOMEN',
    subtitle: 'ELEGANT & RADIANT',
    desc: 'Blush peonies, Bulgarian rose, vanilla orchid, and sparkling berries.',
    image: '/assets/col-women.png',
    accent: 'border-pink-500/40 hover:border-pink-400',
  },
  {
    category: 'Attars' as Category,
    title: 'ATTARS',
    subtitle: 'TRADITIONAL & PURE',
    desc: '100% alcohol-free concentrated oils distilled in pure copper alembics.',
    image: '/assets/bottle-attar.png',
    accent: 'border-gold-500/40 hover:border-gold-400',
  },
  {
    category: 'Discovery Set' as Category,
    title: 'DISCOVERY SET',
    subtitle: 'EXPLORE THE SPECTRUM',
    desc: '5 luxury 10ml flacons in a collector magnetic box with voucher.',
    image: '/assets/col-discovery.png',
    accent: 'border-amber-500/40 hover:border-amber-400',
  },
];

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  onSelectCategory,
  onViewAll
}) => {
  return (
    <section
      id="phase-7"
      className="relative w-full overflow-hidden bg-black py-24 transition-colors duration-1000 border-t border-white/5"
    >
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 border-b border-white/10 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="font-cinzel text-xs tracking-[0.3em] text-gold-400 font-bold">
                07
              </span>
              <span className="w-8 h-[1px] bg-neutral-700" />
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-400">
                EXPLORE OUR
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl text-white tracking-[0.08em]">
              COLLECTIONS
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="group inline-flex items-center space-x-2 text-xs font-mono tracking-[0.25em] text-gold-300 hover:text-white uppercase transition-colors"
          >
            <span>VIEW ALL CREATIONS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Large Editorial Portals Grid (Matches MAIN IDEA.png) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {COLLECTION_PORTALS.map((portal) => (
            <div
              key={portal.title}
              onClick={() => onSelectCategory(portal.category)}
              className="group relative h-[360px] sm:h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-gold-400/60 transition-all duration-500 shadow-2xl flex flex-col justify-end p-6"
            >
              {/* Background Portal Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-[0.9]"
                style={{ backgroundImage: `url('${portal.image}')` }}
              />

              {/* Dark Vignette & Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

              {/* Hover Ambient Glow */}
              <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Content */}
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-mono tracking-[0.3em] text-gold-300 uppercase block">
                  {portal.subtitle}
                </span>

                <h3 className="font-cinzel text-2xl text-white tracking-wider group-hover:text-gold-200 transition-colors">
                  {portal.title}
                </h3>

                <p className="text-xs text-neutral-300 font-sans line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  {portal.desc}
                </p>

                <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-gold-400 group-hover:translate-x-1 transition-transform">
                  <span>DISCOVER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
