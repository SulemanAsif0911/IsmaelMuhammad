import React, { useState } from 'react';
import { X, Sparkles, Compass, Check, ArrowRight, RotateCcw, ShoppingBag, Eye } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ScentFinderModal = ({ isOpen, onClose }) => {
  const { products, addToCart, navigateTo, formatPrice } = useShop();

  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState('earthy');
  const [selectedOccasion, setSelectedOccasion] = useState('evening');
  const [selectedIntensity, setSelectedIntensity] = useState('heavy');
  const [matchedProduct, setMatchedProduct] = useState(null);

  if (!isOpen) return null;

  const moods = [
    {
      id: 'earthy',
      title: 'Ancient Woods & Resins',
      desc: 'Virginian cedar, frankincense, smoky spices, wet moss',
      icon: '🌲',
    },
    {
      id: 'aquatic',
      title: 'Oceanic Currents & Salt',
      desc: 'Mineral ambergris, Calabrian bergamot, driftwood, sea spray',
      icon: '🌊',
    },
    {
      id: 'amber',
      title: 'Molten Honey & Vanilla',
      desc: 'Warm golden amber, bourbon tobacco, cinnamon bark, labdanum',
      icon: '🍯',
    },
    {
      id: 'rose',
      title: 'Crimson Florals & Agarwood',
      desc: 'Midnight Damask rose, Persian saffron, velvety praline, oud',
      icon: '🌹',
    },
    {
      id: 'attar',
      title: 'Pure Distilled Oils',
      desc: '100% alcohol-free traditional copper-distilled Cambodian agarwood',
      icon: '🪔',
    },
  ];

  const occasions = [
    { id: 'daily', title: 'Executive Daily Wear', desc: 'Commanding office presence, business summits' },
    { id: 'evening', title: 'Black-Tie & Evenings', desc: 'Intimate dinners, weddings, galas' },
    { id: 'summer', title: 'High Heat & Sunshine', desc: 'Invigorating freshness that will not evaporate in humidity' },
    { id: 'sacred', title: 'Sacred Gatherings', desc: 'Jummah, meditative moments, family rituals' },
  ];

  const intensities = [
    { id: 'intimate', title: 'Intimate Scent Bubble', desc: 'Clings close to the skin; invites someone to lean in' },
    { id: 'moderate', title: 'Balanced Radiance (4-5 ft)', desc: 'Leaves a distinguished trail without overwhelming a room' },
    { id: 'heavy', title: 'Beast-Mode Projection (8+ ft)', desc: 'Maximum sillage that commands attention all day and night' },
  ];

  const calculateMatch = () => {
    let matchId = 'five-nine';
    if (selectedMood === 'aquatic' || selectedOccasion === 'summer') {
      matchId = 'oceania-nocturne';
    } else if (selectedMood === 'amber') {
      matchId = 'ambre-noble';
    } else if (selectedMood === 'rose') {
      matchId = 'velvet-sillage';
    } else if (selectedMood === 'attar' || selectedOccasion === 'sacred') {
      matchId = 'dehn-al-oud-royal';
    } else if (selectedMood === 'earthy') {
      matchId = 'five-nine';
    }
    const found = products.find((p) => p.id === matchId) || products[0];
    setMatchedProduct(found);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setMatchedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#090f0c] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-white/50 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[10px] font-mono tracking-widest uppercase text-[#d4af37] mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Olfactory Consultation</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
            Find Your Signature Flacon
          </h2>
          <p className="text-xs text-white/60 font-light mt-1">
            Answer 3 quick sensory questions to match your personality with the ideal creation.
          </p>

          {/* Progress Dots */}
          {step < 4 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step === s ? 'w-8 bg-[#d4af37]' : step > s ? 'w-4 bg-[#22c55e]' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* STEP 1: Olfactory Environment & Mood */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white/70 text-center">
              Step 1: Which scent landscape draws your senses?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {moods.map((m) => {
                const isSelected = selectedMood === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMood(m.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-white shadow-lg'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{m.icon}</span>
                      <h4 className="font-serif-luxury text-base text-white">{m.title}</h4>
                    </div>
                    <p className="text-[11px] text-white/50 mt-1 font-light leading-snug">
                      {m.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-full bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-widest flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: When will you wear it? */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white/70 text-center">
              Step 2: When will you wear this fragrance most?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {occasions.map((o) => {
                const isSelected = selectedOccasion === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => setSelectedOccasion(o.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-white shadow-lg'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/30'
                    }`}
                  >
                    <h4 className="font-serif-luxury text-base text-white">{o.title}</h4>
                    <p className="text-[11px] text-white/50 mt-1 font-light leading-snug">
                      {o.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-mono uppercase text-white/50 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-full bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-widest flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Projection & Intensity */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white/70 text-center">
              Step 3: What level of sillage and aura do you prefer?
            </h3>
            <div className="space-y-3 pt-2">
              {intensities.map((i) => {
                const isSelected = selectedIntensity === i.id;
                return (
                  <button
                    key={i.id}
                    onClick={() => setSelectedIntensity(i.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-white shadow-lg'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/30'
                    }`}
                  >
                    <h4 className="font-serif-luxury text-base text-white">{i.title}</h4>
                    <p className="text-[11px] text-white/50 mt-0.5 font-light">
                      {i.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-mono uppercase text-white/50 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={calculateMatch}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3de8a] to-[#d4af37] text-black text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reveal My Match</span>
              </button>
            </div>
          </div>
        )}

        {/* RESULT STEP */}
        {step === 4 && matchedProduct && (
          <div className="space-y-6 text-center animate-fadeIn">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#22c55e]">
              ✓ Exact Olfactory Alignment Found
            </span>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-[#d4af37]/40 flex flex-col sm:flex-row items-center gap-6 text-left">
              <div className="w-32 h-36 bg-black/50 rounded-xl p-2 border border-white/10 flex items-center justify-center flex-shrink-0">
                <img
                  src={matchedProduct.bottleTrans || matchedProduct.bottleImage}
                  alt={matchedProduct.name}
                  className="max-h-32 object-contain"
                />
              </div>

              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-mono uppercase text-[#d4af37]">
                  {matchedProduct.collection}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white">
                  {matchedProduct.name}
                </h3>
                <p className="text-xs text-white/70 font-light">
                  {matchedProduct.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {matchedProduct.accords.map((a) => (
                    <span
                      key={a}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <div className="pt-2 text-sm font-mono text-[#d4af37] font-semibold">
                  {formatPrice(matchedProduct.price)} (50 ML)
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  addToCart(matchedProduct);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#d4af37] hover:bg-[#e4bf46] text-black font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('product', matchedProduct.id);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Full Notes</span>
              </button>

              <button
                onClick={handleReset}
                className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1.5 px-3 py-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
