import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, X } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/products';
import { JournalArticle } from '../types';

export const JournalView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <div className="min-h-screen bg-[#060A08] text-[#E8E6E1] pt-28 pb-24 selection:bg-gold-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold-400 font-mono">
            Editorial & Olfactory Education
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-light uppercase tracking-wider">
            The Fragrance Journal
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-sans">
            Deep-dives into maceration science, ancient attar distillations, scent architecture, and perfume rituals.
          </p>
        </div>

        {/* Featured Article Hero */}
        <div 
          onClick={() => setSelectedArticle(JOURNAL_ARTICLES[0])}
          className="cursor-pointer group relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 mb-16 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-gold-400/40 transition-all"
        >
          <div className="lg:col-span-7 h-72 sm:h-96 relative overflow-hidden">
            <img
              src={JOURNAL_ARTICLES[0].image}
              alt={JOURNAL_ARTICLES[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-3 text-xs text-gold-400 font-mono">
              <span className="uppercase tracking-widest">{JOURNAL_ARTICLES[0].category}</span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-white/40">
                <Clock className="w-3.5 h-3.5" />
                <span>{JOURNAL_ARTICLES[0].readTime}</span>
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-gold-300 transition-colors leading-snug">
              {JOURNAL_ARTICLES[0].title}
            </h2>

            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans line-clamp-3">
              {JOURNAL_ARTICLES[0].excerpt}
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Other Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JOURNAL_ARTICLES.slice(1).map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="cursor-pointer group rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold-400/40 p-6 transition-all flex flex-col justify-between"
            >
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[10px] uppercase font-mono tracking-widest bg-black/70 px-2.5 py-1 rounded text-gold-300 border border-white/10">
                  {article.category}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs text-white/40 font-mono">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl text-white group-hover:text-gold-300 transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="pt-2 flex items-center space-x-1.5 text-xs uppercase tracking-widest text-gold-400 font-medium">
                  <span>Explore Article</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reading Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedArticle(null)}
            />
            <div className="relative bg-[#070D09] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 z-10 shadow-2xl">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-mono">
                {selectedArticle.category} • {selectedArticle.readTime}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl text-white mt-2 mb-4 leading-snug">
                {selectedArticle.title}
              </h2>

              <p className="font-serif text-sm text-gold-300/80 italic mb-6">
                {selectedArticle.subtitle}
              </p>

              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-56 object-cover rounded-xl mb-6 border border-white/10"
              />

              <div className="space-y-4 text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2 rounded-full bg-gold-500 text-black font-semibold text-xs uppercase tracking-widest"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
