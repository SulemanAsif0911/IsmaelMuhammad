import React, { useState } from 'react';
import { articles } from '../data/articles';
import { ArrowRight, BookOpen, Clock, Calendar, User, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const JournalPage = () => {
  const { navigateTo } = useShop();
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="min-h-screen bg-[#060907] text-white pt-28 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-16">
        <div className="max-w-2xl space-y-4">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#d4af37]">
            Editorial & Education
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-white font-light tracking-tight">
            THE JOURNAL
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            Explorations into the science of olfactory longevity, rare botanical sourcing,
            and the ancient alchemy of attar distillation.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {selectedArticle ? (
          /* Full Article Reader View */
          <div className="max-w-3xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-8 animate-fadeIn">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-xs font-mono uppercase tracking-widest text-[#d4af37] flex items-center gap-2 hover:underline"
            >
              ← Back to All Articles
            </button>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#d4af37]/20 text-[#f5e6b3] border border-[#d4af37]/30">
                {selectedArticle.category}
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-4 text-xs font-mono text-white/40 pt-2 border-b border-white/10 pb-4">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#d4af37]" /> {selectedArticle.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {selectedArticle.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}
                </span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-80 object-cover"
              />
            </div>

            <div className="prose prose-invert max-w-none text-white/80 space-y-4 text-sm leading-relaxed font-light">
              {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph.trim()}
                </p>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 flex justify-between items-center">
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white"
              >
                Close Article
              </button>

              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-2.5 rounded-full bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#e2bd46]"
              >
                Explore Fragrance Vault
              </button>
            </div>
          </div>
        ) : (
          /* Magazine Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/50 overflow-hidden cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-black/70 backdrop-blur-md border border-white/15 text-[#d4af37]">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-white/40">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="font-serif-luxury text-xl text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs text-white/60 font-light line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#d4af37] group-hover:text-[#f3de8a]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
