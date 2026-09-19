import React, { useState } from 'react';
import { X, Sparkles, Compass, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface ScentFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ScentFinderModal: React.FC<ScentFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState<string>('earthy');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('evening');
  const [selectedExperience, setSelectedExperience] = useState<string>('signature');
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  if (!isOpen) return null;

  const handleFinishQuiz = () => {
    let resultSlug = 'five-nine';
    if (selectedMood === 'aquatic') {
      resultSlug = 'oceanic-sillage';
    } else if (selectedMood === 'amber') {
      resultSlug = 'imperial-amber';
    } else if (selectedMood === 'rose') {
      resultSlug = 'royal-damascus';
    } else if (selectedMood === 'attar') {
      resultSlug = 'sultans-attar-royale';
    } else if (selectedExperience === 'discovery') {
      resultSlug = 'the-discovery-flight';
    } else if (selectedMood === 'earthy') {
      resultSlug = 'five-nine';
    }

    const found = PRODUCTS.find((p) => p.slug === resultSlug) || PRODUCTS[0];
    setMatchedProduct(found);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedMood('earthy');
    setSelectedOccasion('evening');
    setSelectedExperience('signature');
    setMatchedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#070D09] text-[#E8E6E1] border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl z-10 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <h3 className="font-serif text-lg tracking-[0.2em] uppercase text-white font-light">
              Fragrance Oracle · Scent Finder
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="flex items-center justify-between mb-6 text-xs text-white/50">
            <span>Step {step} of 3</span>
            <div className="flex space-x-1.5">
              <span className={`w-8 h-1 rounded-full ${step >= 1 ? 'bg-gold-400' : 'bg-white/10'}`}></span>
              <span className={`w-8 h-1 rounded-full ${step >= 2 ? 'bg-gold-400' : 'bg-white/10'}`}></span>
              <span className={`w-8 h-1 rounded-full ${step >= 3 ? 'bg-gold-400' : 'bg-white/10'}`}></span>
            </div>
          </div>
        )}

        {/* Step 1: Mood / Aura */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-serif text-2xl text-white font-light">
              What presence or aura do you wish to project?
            </h4>
            <p className="text-xs text-white/50">
              Select the emotional character that speaks to your spirit.
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                { id: 'earthy', title: 'Commanding & Deep Forest', desc: 'Ancient cedarwood, pink pepper, warm resinous amber' },
                { id: 'aquatic', title: 'Crystalline Oceanic Serenity', desc: 'Sea salt spray, mineral ambergris, ozone driftwood' },
                { id: 'amber', title: 'Opulent & Warm Vanilla', desc: 'Fossilized golden amber, Bourbon vanilla, smoldering myrrh' },
                { id: 'rose', title: 'Aristocratic Rose & Saffron', desc: 'Taif rose absolute, Kashmiri saffron, royal smoked oud' },
                { id: 'attar', title: 'Sacred Non-Alcoholic Oil', desc: '100% pure concentrated oil, Assam Hindi oud, Mysore sandalwood' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedMood(opt.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    selectedMood === opt.id
                      ? 'border-gold-400 bg-gold-500/10 text-white'
                      : 'border-white/10 bg-black/40 text-white/70 hover:border-white/20'
                  }`}
                >
                  <div>
                    <p className="font-medium text-xs tracking-wider uppercase text-gold-300">{opt.title}</p>
                    <p className="text-[11px] text-white/50 mt-0.5">{opt.desc}</p>
                  </div>
                  {selectedMood === opt.id && <Check className="w-4 h-4 text-gold-400 shrink-0" />}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs uppercase tracking-[0.2em] flex items-center space-x-1.5 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Occasion */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="font-serif text-2xl text-white font-light">
              Where will this fragrance accompany you?
            </h4>
            <p className="text-xs text-white/50">
              Fragrances bloom differently depending on climate and context.
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                { id: 'evening', title: 'Evening Gala & Black Tie Events', desc: 'Demands long sillage, projection, and luxurious depth' },
                { id: 'daily', title: 'Daily Executive & Office Signature', desc: 'Sophisticated, pleasant in close quarters, high staying power' },
                { id: 'summer', title: 'High Heat & Warm Humid Days', desc: 'Needs invigorating freshness that cuts through humidity without cloying' },
                { id: 'intimate', title: 'Spiritual, Romantic & Personal', desc: 'Sits close to the skin, whispering warmth and intimacy' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOccasion(opt.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    selectedOccasion === opt.id
                      ? 'border-gold-400 bg-gold-500/10 text-white'
                      : 'border-white/10 bg-black/40 text-white/70 hover:border-white/20'
                  }`}
                >
                  <div>
                    <p className="font-medium text-xs tracking-wider uppercase text-gold-300">{opt.title}</p>
                    <p className="text-[11px] text-white/50 mt-0.5">{opt.desc}</p>
                  </div>
                  {selectedOccasion === opt.id && <Check className="w-4 h-4 text-gold-400 shrink-0" />}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2 rounded-full border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-wider transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs uppercase tracking-[0.2em] flex items-center space-x-1.5 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Experience Format */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="font-serif text-2xl text-white font-light">
              How would you like to experience your scent?
            </h4>
            <p className="text-xs text-white/50">
              Choose whether you are ready for a signature flacon or wish to test.
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                { id: 'signature', title: 'Commit to a Signature Flacon', desc: 'Ready for full 50ml or 100ml heavy glass luxury bottle' },
                { id: 'travel', title: 'Pocket Luxury Atomizer', desc: '10ml travel spray ready for pocket and on-the-go reapplication' },
                { id: 'discovery', title: 'Curated 5-Piece Discovery Set', desc: 'Test all 5 masterworks at home with ₨1,000 credit included' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedExperience(opt.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    selectedExperience === opt.id
                      ? 'border-gold-400 bg-gold-500/10 text-white'
                      : 'border-white/10 bg-black/40 text-white/70 hover:border-white/20'
                  }`}
                >
                  <div>
                    <p className="font-medium text-xs tracking-wider uppercase text-gold-300">{opt.title}</p>
                    <p className="text-[11px] text-white/50 mt-0.5">{opt.desc}</p>
                  </div>
                  {selectedExperience === opt.id && <Check className="w-4 h-4 text-gold-400 shrink-0" />}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2 rounded-full border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-wider transition-all"
              >
                Back
              </button>
              <button
                onClick={handleFinishQuiz}
                className="px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs uppercase tracking-[0.2em] flex items-center space-x-1.5 transition-all"
              >
                <span>Reveal My Match</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results Screen */}
        {step === 4 && matchedProduct && (
          <div className="space-y-6 text-center pt-2">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 font-mono text-[10px] uppercase tracking-widest border border-gold-400/40">
                ★ 98% Olfactive Alignment
              </span>
              <h4 className="font-serif text-3xl text-white font-light mt-2">
                Your Ideal Olfactory Signature
              </h4>
            </div>

            {/* Matched Product Card */}
            <div className="bg-black/50 border border-gold-500/30 rounded-xl p-5 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 text-left">
              <img
                src={matchedProduct.image}
                alt={matchedProduct.name}
                className="w-24 h-32 object-contain bg-white/5 rounded p-1 border border-white/10 shadow-lg"
              />
              <div className="flex-1 space-y-1.5">
                <span className="text-[10px] text-gold-400 font-mono tracking-widest uppercase">
                  {matchedProduct.subtitle}
                </span>
                <h5 className="font-serif text-xl text-white uppercase font-medium">
                  {matchedProduct.name}
                </h5>
                <p className="text-xs text-gold-300 tracking-wider">
                  {matchedProduct.tagline}
                </p>
                <p className="text-xs text-white/60 line-clamp-2 mt-1">
                  {matchedProduct.description}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-serif text-lg text-gold-200">
                    ₨{matchedProduct.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                    {matchedProduct.longevity}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onAddToCart(matchedProduct);
                  onClose();
                }}
                className="flex-1 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-lg shadow-gold-500/20"
              >
                Add To Cart (₨{matchedProduct.price.toLocaleString()})
              </button>
              <button
                onClick={() => {
                  onSelectProduct(matchedProduct);
                  onClose();
                }}
                className="px-6 py-3 rounded-full border border-white/20 hover:border-gold-400 text-white hover:text-gold-300 text-xs uppercase tracking-[0.2em] transition-all"
              >
                View Full Notes
              </button>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center space-x-1.5 text-[11px] text-white/40 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retake Quiz</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
