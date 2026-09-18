import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

const ARTICLES = [
  {
    id: 'art-1',
    title: 'How to Maximize Fragrance Longevity in Pakistani Heat & Humidity',
    category: 'Olfactive Guide',
    date: 'March 14, 2026',
    readTime: '4 min read',
    excerpt:
      'Understanding pulse points, skin hydration, and why high-concentration Extrait de Parfum outlasts standard commercial Eau de Toilette in summer.',
    image: '/assets/forest-background.png',
  },
  {
    id: 'art-2',
    title: 'The Sacred Anatomy of Oud: From Assam to Taif',
    category: 'Heritage',
    date: 'February 22, 2026',
    readTime: '6 min read',
    excerpt:
      'A deep dive into why pure agarwood resin remains the most precious raw material in the history of perfumery, and how we blend it in Charming & Hopeful.',
    image: '/assets/transition-landscape.png',
  },
  {
    id: 'art-3',
    title: 'The Art of Scent Layering: Combining Attars with Extrait Sprays',
    category: 'Technique',
    date: 'January 30, 2026',
    readTime: '5 min read',
    excerpt:
      'How applying a pure non-alcoholic attar base on warm wrists creates an anchor that doubles the projection of your favorite French perfume spray.',
    image: '/assets/ocean-conversion-raw.png',
  },
];

export const JournalView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050807] text-white pt-28 pb-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.35em] text-gold-400 uppercase">
            The Olfactive Gazette
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl text-white tracking-[0.08em]">
            JOURNAL
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
            Essays on raw materials, perfumery heritage, layering alchemy, and the sensory world.
          </p>
        </div>

        {/* Featured Article */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl bg-black/40 border border-white/10 overflow-hidden items-center p-6 sm:p-8">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden h-[320px]">
            <img
              src="/assets/forest-background.png"
              alt="Fragrance Journal Hero"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
              Featured Essay · Masterclass
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl text-white leading-snug">
              Why 60-Day Maceration Changes Everything
            </h2>
            <p className="text-xs text-neutral-300 font-sans font-light leading-relaxed">
              When fresh perfume oils are mixed with grain alcohol, the molecules are chaotic and harsh.
              Only through quiet darkness and weeks of aging do the molecular bonds coalesce into silk.
            </p>
            <div className="flex items-center space-x-4 text-[11px] font-mono text-neutral-400 pt-2">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> March 2026</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art) => (
            <div
              key={art.id}
              className="rounded-2xl bg-black/40 border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-gold-400/50 transition-all p-5"
            >
              <div className="space-y-4">
                <div className="h-44 rounded-xl overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-gold-400 uppercase">
                  <span>{art.category}</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="font-cinzel text-lg text-white font-medium group-hover:text-gold-200 transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-xs font-mono text-gold-400">
                <span>READ ESSAY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
