import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Compass, 
  Sparkles, 
  Volume2, 
  ShoppingBag, 
  Eye, 
  Star,
  ChevronLeft,
  ChevronDown
} from 'lucide-react';
import { Product, ProductSizeOption, ActiveView } from '../types';
import { PRODUCTS } from '../data/products';
import { soundEngine } from '../audio/soundEngine';

interface CinematicHomeProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: ProductSizeOption) => void;
  setActiveView: (view: ActiveView) => void;
  onJumpToShopCategory?: (category: string) => void;
  currentScene: number;
  setCurrentScene: (scene: number) => void;
}

export const CinematicHome: React.FC<CinematicHomeProps> = ({
  onSelectProduct,
  onAddToCart,
  setActiveView,
  onJumpToShopCategory,
  currentScene,
  setCurrentScene,
}) => {
  // Products references
  const fiveNine = PRODUCTS.find((p) => p.slug === 'five-nine') || PRODUCTS[0];
  const oceanicSillage = PRODUCTS.find((p) => p.slug === 'oceanic-sillage') || PRODUCTS[1];
  const imperialAmber = PRODUCTS.find((p) => p.slug === 'imperial-amber') || PRODUCTS[2];
  const oceanNoir = PRODUCTS.find((p) => p.slug === 'ocean-noir') || PRODUCTS[3];
  const emeraldOud = PRODUCTS.find((p) => p.slug === 'emerald-oud') || PRODUCTS[4];
  const royalDamascus = PRODUCTS.find((p) => p.slug === 'royal-damascus') || PRODUCTS[5];

  // Forest Carousel Selection (Scene 02)
  const forestProducts = [fiveNine, imperialAmber, emeraldOud, royalDamascus];
  const [activeForestIndex, setActiveForestIndex] = useState(0);
  const activeForestProd = forestProducts[activeForestIndex];

  // Ocean Depth Selection (Scene 04)
  const depthLevels = [
    { label: 'SURFACE', depth: '0 M', desc: 'Sunlit crystalline sea spray', note: 'Crushed Sea Salt & Bergamot' },
    { label: '10 M', depth: '10 M', desc: 'Cool azure currents & blue sage', note: 'Mineral Ambergris & Sage' },
    { label: '20 M', depth: '20 M', desc: 'Midnight sea currents & cedar', note: 'Smoked Cedar & Dark Ambroxan' },
    { label: '30 M', depth: '30 M', desc: 'Deep sapphire pressure & vetiver', note: 'Deep Sea Botanicals' },
    { label: '40 M', depth: '40 M', desc: 'The Abyssal Vault: Rarest Olfactory Treasure', note: 'Oceanic Sillage Extrait' },
  ];
  const [selectedDepthIndex, setSelectedDepthIndex] = useState(4); // 40m default

  // Story Chapters Selection (Scene 06)
  const [activeStoryChapter, setActiveStoryChapter] = useState(0);
  const storyChapters = [
    {
      id: 'beginning',
      title: 'THE BEGINNING',
      heading: 'From Lifelong Collector to Artistic Nose',
      content: 'Ismaeel Muhammad’s obsession with perfumery began not in a commercial boardroom, but in private libraries filled with rare distillations. Years of testing vintage masterpieces revealed a tragic truth: modern perfumes had lost their soul, diluted by commercial compromise.'
    },
    {
      id: 'passion',
      title: 'THE PASSION',
      heading: 'The Emotional Architecture of Scent',
      content: 'Fragrance is the only art form that bypasses the rational brain to strike memory and emotion directly. We craft perfumes that evoke ancient morning forests, sunlit sea trenches, and intimate velvet evenings.'
    },
    {
      id: 'craft',
      title: 'THE CRAFT',
      heading: 'Uncompromising Extrait Formulations',
      content: 'We refuse the industry standard 10–12% dilution. Every Ismaeel Muhammad creation is formulated between 25% and 33% oil concentration using genuine Cambodian agarwood, Atlas cedar, and Taif roses.'
    },
    {
      id: 'brand',
      title: 'THE BRAND',
      heading: 'Haute Parfumerie from Lahore to the World',
      content: 'Ismaeel Muhammad stands as Pakistan’s premier luxury perfume house. Every flacon is hand-inspected in our Lahore studio, proving our artisanal craftsmanship stands alongside the world’s most prestigious ateliers.'
    },
    {
      id: 'future',
      title: 'THE FUTURE',
      heading: 'Preserving Heritage, Inspiring Tomorrow',
      content: 'We continue to pioneer sustainable raw extraction techniques while reintroducing ancient non-alcoholic pure attars to a global audience of young, discerning connoisseurs.'
    }
  ];

  // Mouse Parallax for Hero Bottle
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Particles Canvas Effect in Hero & Ocean
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 45 ambient floating particles (pollen spores / golden dust / bubbles)
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += 0.02;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

        // Color shifts based on current scene (golden amber in forest, cyan in ocean)
        ctx.fillStyle = currentScene >= 4 
          ? `rgba(21, 168, 209, ${currentOpacity})`
          : `rgba(218, 182, 74, ${currentOpacity})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [currentScene]);

  // Scroll detection to update active scene & sound engine mix
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate approximate active scene based on scroll position
      const scene1 = document.getElementById('scene-01')?.offsetTop || 0;
      const scene2 = document.getElementById('scene-02')?.offsetTop || windowHeight;
      const scene3 = document.getElementById('scene-03')?.offsetTop || windowHeight * 2;
      const scene4 = document.getElementById('scene-04')?.offsetTop || windowHeight * 3;
      const scene5 = document.getElementById('scene-05')?.offsetTop || windowHeight * 4;
      const scene6 = document.getElementById('scene-06')?.offsetTop || windowHeight * 5;
      const scene7 = document.getElementById('scene-07')?.offsetTop || windowHeight * 6;

      const triggerOffset = windowHeight * 0.4;

      let detectedScene = 1;
      if (scrollY >= scene7 - triggerOffset) detectedScene = 7;
      else if (scrollY >= scene6 - triggerOffset) detectedScene = 6;
      else if (scrollY >= scene5 - triggerOffset) detectedScene = 5;
      else if (scrollY >= scene4 - triggerOffset) detectedScene = 4;
      else if (scrollY >= scene3 - triggerOffset) detectedScene = 3;
      else if (scrollY >= scene2 - triggerOffset) detectedScene = 2;
      else detectedScene = 1;

      setCurrentScene(detectedScene);

      // Sound Engine audio cross-fade
      // Ocean begins at scene 3 transition, full by scene 4 & 5
      if (detectedScene <= 2) {
        soundEngine.setEnvironmentMix(0.0);
      } else if (detectedScene === 3) {
        soundEngine.setEnvironmentMix(0.5);
      } else if (detectedScene >= 4 && detectedScene <= 5) {
        soundEngine.setEnvironmentMix(1.0);
      } else {
        soundEngine.setEnvironmentMix(0.2); // warm atelier
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setCurrentScene]);

  const scrollToNextScene = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative bg-[#050906] text-[#E8E6E1] overflow-x-hidden"
      onMouseMove={handleHeroMouseMove}
    >
      {/* Global Ambient Floating Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 opacity-70"
      />

      {/* =========================================================================
          PHASE 01: THE OPENING / HERO FOREST ("THE SCENT AWAKENS")
          ========================================================================= */}
      <section
        id="scene-01"
        className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden selection:bg-gold-500/30"
      >
        {/* Layer 01: Distant Ancient Forest with Waterfall & Volumetric Sunlight */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: "url('/images/environments/forest_background.png')",
            transform: `scale(1.05) translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`,
          }}
        >
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050906] via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        {/* Layer 04: Midground / Foreground Mossy Botanical Layer (MODEL1.png) */}
        <div
          className="absolute inset-0 bg-cover bg-bottom pointer-events-none z-10 opacity-90 transition-transform duration-500 ease-out"
          style={{
            backgroundImage: "url('/images/environments/forest_foreground_plants.png')",
            transform: `translate(${mousePos.x * -16}px, ${mousePos.y * -12}px)`,
          }}
        />

        {/* Layer 06: Canopy Framing Leaves (MODEL2.png) */}
        <div
          className="absolute inset-0 bg-cover bg-top pointer-events-none z-20 opacity-80 transition-transform duration-700 ease-out"
          style={{
            backgroundImage: "url('/images/environments/forest_canopy_framing.png')",
            transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
          }}
        />

        {/* Volumetric Warm Light Shaft */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-full bg-gradient-to-b from-gold-300/15 via-gold-400/5 to-transparent blur-3xl pointer-events-none z-10"
          style={{
            transform: `translateX(-50%) skewX(-12deg) translate(${mousePos.x * 20}px, 0)`,
          }}
        />

        {/* Hero Centerpiece: Amber Glass Perfume Flacon */}
        <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
          <div 
            onClick={() => onSelectProduct(fiveNine)}
            className="relative pointer-events-auto cursor-pointer group flex flex-col items-center"
            style={{
              transform: `translate(${mousePos.x * 18}px, ${mousePos.y * 14}px)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* Amber liquid pulsing glow */}
            <div className="absolute -inset-10 bg-radial from-gold-500/35 via-gold-400/10 to-transparent blur-2xl rounded-full opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 animate-pulse-glow" />

            {/* Amber Hero Bottle Asset */}
            <img
              src="/images/products/bottle_hero_amber.png"
              alt="Five-Nine Haute Parfumerie Flacon"
              className="relative z-10 h-64 sm:h-80 md:h-[390px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500"
            />

            {/* Floating interaction badge on bottle */}
            <div className="relative -mt-6 z-20 px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold-400/50 text-gold-300 text-[10px] uppercase font-mono tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl flex items-center space-x-1.5">
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>Click to Enter Fragrance</span>
            </div>
          </div>
        </div>

        {/* Content Overlay: Left Minimal Luxury Copy */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 sm:mt-16 pointer-events-none">
          <div className="max-w-xl pointer-events-auto space-y-4">
            
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono tracking-[0.3em] text-gold-400 uppercase">
                01 / 07
              </span>
              <div className="w-8 h-px bg-gold-400/50" />
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/60">
                The Awakening
              </span>
            </div>

            <p className="text-xs tracking-[0.35em] text-gold-300 font-sans uppercase">
              More Than A Scent
            </p>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-light tracking-wide uppercase leading-tight">
              A Journey <br />
              <span className="italic font-normal text-gold-100">of Senses</span>
            </h1>

            <p className="text-xs sm:text-sm text-white/70 max-w-md leading-relaxed font-sans pt-1">
              Crafted for those who seek more — timeless fragrances inspired by ancient pine forests, abyssal oceans, and authentic oriental heritage.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectProduct(fiveNine)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-semibold text-xs uppercase tracking-[0.25em] transition-all shadow-xl shadow-gold-500/20 flex items-center space-x-2 group"
              >
                <span>Explore Fragrance</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToNextScene('scene-02')}
                className="px-6 py-3.5 rounded-full border border-white/20 hover:border-gold-400/60 bg-black/40 backdrop-blur-sm text-white/80 hover:text-white text-xs uppercase tracking-[0.2em] transition-all"
              >
                Enter The Forest
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-end pointer-events-none">
          <div className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
            Haute Parfumerie · 30% Extrait Concentration
          </div>

          <button
            onClick={() => scrollToNextScene('scene-02')}
            className="pointer-events-auto group flex flex-col items-center space-y-2 text-white/60 hover:text-gold-300 transition-colors"
          >
            <div className="w-5 h-9 rounded-full border border-white/30 group-hover:border-gold-400 flex items-start justify-center p-1 transition-colors">
              <div className="w-1 h-2 bg-gold-400 rounded-full animate-bounce" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-[0.3em]">
              Scroll to Enter
            </span>
          </button>
        </div>
      </section>

      {/* =========================================================================
          PHASE 02: THE FOREST COLLECTION ("FIVE-NINE")
          ========================================================================= */}
      <section
        id="scene-02"
        className="relative min-h-screen flex items-center py-24 overflow-hidden border-t border-white/5"
      >
        {/* Background Forest Scene Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/scenes/scene_02_forest.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono tracking-[0.3em] text-gold-400 uppercase">
                  02 / 07
                </span>
                <div className="w-8 h-px bg-gold-400/50" />
                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/50">
                  The Forest
                </span>
              </div>

              <span className="text-xs uppercase tracking-[0.3em] text-white/40 font-mono">
                Terrestrial Botanicals
              </span>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-light uppercase tracking-wider">
                {activeForestProd.name}
              </h2>

              <p className="text-xs tracking-[0.25em] text-gold-300 font-mono uppercase">
                {activeForestProd.tagline}
              </p>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans max-w-md pt-2">
                {activeForestProd.description}
              </p>

              {/* Note Accords Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeForestProd.topNotes.slice(0, 3).map((n) => (
                  <span key={n} className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] text-white/80 font-sans">
                    {n}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={() => onSelectProduct(activeForestProd)}
                  className="px-7 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs uppercase tracking-[0.25em] transition-all flex items-center space-x-2"
                >
                  <span>Discover →</span>
                </button>

                <button
                  onClick={() => onAddToCart(activeForestProd, activeForestProd.sizes[0])}
                  className="px-6 py-3 rounded-full border border-white/20 hover:border-gold-400 text-white hover:text-gold-300 text-xs uppercase tracking-[0.2em] transition-all flex items-center space-x-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>₨{activeForestProd.price.toLocaleString()}</span>
                </button>
              </div>

            </div>

            {/* Center Product Showcase */}
            <div className="lg:col-span-4 flex justify-center">
              <div 
                onClick={() => onSelectProduct(activeForestProd)}
                className="cursor-pointer group relative w-64 sm:w-80 aspect-[3/4] flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-radial from-emerald-500/20 via-transparent to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
                <img
                  src={activeForestProd.image}
                  alt={activeForestProd.name}
                  className="relative z-10 max-h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Product Switcher Carousel */}
            <div className="lg:col-span-3 flex flex-col items-end space-y-4">
              <div className="flex items-center space-x-2 text-xs text-white/50">
                <button
                  onClick={() => setActiveForestIndex((prev) => (prev > 0 ? prev - 1 : forestProducts.length - 1))}
                  className="p-2 rounded-full border border-white/10 hover:border-gold-400 hover:text-white transition-colors"
                  title="Previous Forest Fragrance"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-gold-300 text-xs">
                  0{activeForestIndex + 1} / 0{forestProducts.length}
                </span>
                <button
                  onClick={() => setActiveForestIndex((prev) => (prev < forestProducts.length - 1 ? prev + 1 : 0))}
                  className="p-2 rounded-full border border-white/10 hover:border-gold-400 hover:text-white transition-colors"
                  title="Next Forest Fragrance"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Carousel mini bottles thumbnails */}
              <div className="grid grid-cols-4 gap-2.5 bg-black/60 p-3 rounded-2xl border border-white/10">
                {forestProducts.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => setActiveForestIndex(idx)}
                    className={`relative p-1.5 rounded-lg border transition-all flex flex-col items-center ${
                      activeForestIndex === idx
                        ? 'border-gold-400 bg-gold-500/10 scale-105'
                        : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="h-16 w-8 object-contain"
                    />
                    <span className="text-[9px] font-mono text-white/70 mt-1 truncate w-full text-center">
                      {prod.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="text-right text-[11px] text-white/40">
                <span>Botanical Layer: Leaves → Moss → Wood → Amber</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          PHASE 03: THE TRANSITION (FOREST → OPEN LAND → OCEAN)
          ========================================================================= */}
      <section
        id="scene-03"
        className="relative min-h-[90vh] flex items-center py-24 overflow-hidden border-t border-white/5"
      >
        {/* Layer 01: Golden Sunset Mountain Fjord Landscape (transition_landscape.jpg) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700"
          style={{
            backgroundImage: "url('/images/environments/transition_landscape.jpg')",
          }}
        >
          {/* Progressive color transition gradient: Forest green -> Stone Beige -> Deep Ocean Navy */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07130D]/70 via-[#596258]/40 to-[#0A2330]/80" />
        </div>

        {/* Layer 02: Transparent Hillside Foreground (forest_to_ocean_clean.png) */}
        <div 
          className="absolute inset-0 bg-cover bg-bottom z-10 pointer-events-none opacity-85 transition-transform duration-500"
          style={{
            backgroundImage: "url('/images/environments/forest_to_ocean_clean.png')",
            transform: `translate(${mousePos.x * -10}px, 0)`,
          }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-end">
          <div className="max-w-xl bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 space-y-4 shadow-2xl">
            
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono tracking-[0.3em] text-gold-400 uppercase">
                03 / 07
              </span>
              <div className="w-8 h-px bg-gold-400/50" />
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/50">
                The Transition
              </span>
            </div>

            <span className="text-xs uppercase tracking-[0.3em] text-gold-300 font-mono">
              Horizon Transformation
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light uppercase leading-tight">
              From Forest <br />
              <span className="italic font-normal text-gold-200">to Ocean</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
              The trees thin into stone ridges. The damp cedar soil cools into granite cliffs. Ahead lies the boundless horizon where fresh morning air meets salty oceanic tides.
            </p>

            <div className="pt-2 flex items-center space-x-4">
              <button
                onClick={() => scrollToNextScene('scene-04')}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-semibold text-xs uppercase tracking-[0.25em] transition-all flex items-center space-x-2"
              >
                <span>Dive Into The Ocean</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase">
              <span>#07130D (Forest)</span>
              <span>→</span>
              <span>#596258 (Stone)</span>
              <span>→</span>
              <span>#0A2330 (Ocean)</span>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          PHASE 04: THE OCEAN / THE DIVE ("BENEATH THE SURFACE")
          ========================================================================= */}
      <section
        id="scene-04"
        className="relative min-h-screen flex items-center py-24 overflow-hidden border-t border-white/5"
      >
        {/* Layer 01: Ocean Surface with Underwater Light Rays (ocean_conversion_clean.png) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-700"
          style={{
            backgroundImage: "url('/images/environments/ocean_conversion_clean.png')",
          }}
        >
          {/* Depth gradient darkness simulation based on selected depth */}
          <div 
            className="absolute inset-0 transition-colors duration-700"
            style={{
              backgroundColor: `rgba(2, 11, 16, ${0.4 + selectedDepthIndex * 0.12})`,
            }}
          />
        </div>

        {/* Floating Ocean Perfume Bottle */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div 
            onClick={() => onSelectProduct(oceanicSillage)}
            className="cursor-pointer pointer-events-auto group relative w-72 sm:w-96 aspect-[3/4] flex items-center justify-center"
            style={{
              transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 10}px)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* Cyan Submerged Water Glow */}
            <div className="absolute -inset-10 bg-radial from-cyan-500/25 via-blue-500/10 to-transparent blur-3xl rounded-full group-hover:scale-125 transition-all duration-700 animate-pulse-glow" />

            <img
              src="/images/products/bottle_ocean_blue.png"
              alt="Oceanic Sillage Haute Parfumerie Flacon"
              className="relative z-10 max-h-[85%] object-contain drop-shadow-[0_25px_35px_rgba(0,10,25,0.9)] group-hover:scale-108 transition-transform duration-500"
            />

            <div className="absolute bottom-6 px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/50 text-cyan-300 text-[10px] uppercase font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl flex items-center space-x-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Explore Oceanic Sillage</span>
            </div>
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-center gap-12">
          
          {/* Left Narrative */}
          <div className="max-w-lg space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase">
                04 / 07
              </span>
              <div className="w-8 h-px bg-cyan-400/50" />
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/50">
                The Ocean
              </span>
            </div>

            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300 font-mono">
              Depth: {depthLevels[selectedDepthIndex].depth}
            </p>

            <h2 className="font-serif text-4xl sm:text-6xl text-white font-light uppercase leading-tight">
              Beneath <br />
              <span className="italic font-normal text-cyan-200">The Surface</span>
            </h2>

            <p className="font-serif text-lg text-cyan-200/90 italic">
              "Deeper you go, rarer it becomes."
            </p>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans pt-1">
              {depthLevels[selectedDepthIndex].desc}. Infused with sea salt crystal accords, coastal sage, and authentic mineral ambergris anchored by sun-bleached driftwood.
            </p>

            <div className="pt-4 flex items-center space-x-4">
              <button
                onClick={() => onSelectProduct(oceanicSillage)}
                className="px-7 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs uppercase tracking-[0.25em] transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/20"
              >
                <span>Explore Ocean Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onAddToCart(oceanicSillage, oceanicSillage.sizes[0])}
                className="px-6 py-3 rounded-full border border-cyan-400/40 hover:border-cyan-300 text-cyan-300 hover:text-white text-xs uppercase tracking-[0.2em] transition-all flex items-center space-x-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>₨{oceanicSillage.price.toLocaleString()}</span>
              </button>
            </div>
          </div>

          {/* Right Interactive Depth Meter HUD */}
          <div className="bg-black/70 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 flex flex-col space-y-4 text-right">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-cyan-400 pb-2 border-b border-white/10">
              Interactive Depth Meter
            </span>

            <div className="space-y-3">
              {depthLevels.map((lvl, idx) => {
                const isSelected = selectedDepthIndex === idx;
                return (
                  <button
                    key={lvl.label}
                    onClick={() => setSelectedDepthIndex(idx)}
                    className="group w-full flex items-center justify-end space-x-3 text-right focus:outline-none py-1"
                  >
                    <div className="flex flex-col items-end">
                      <span className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                        isSelected ? 'text-cyan-300 font-bold' : 'text-white/40 group-hover:text-white/80'
                      }`}>
                        {lvl.label} ({lvl.depth})
                      </span>
                      {isSelected && (
                        <span className="text-[9px] text-cyan-400/80 font-mono">
                          {lvl.note}
                        </span>
                      )}
                    </div>

                    <div className={`rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'w-3 h-3 bg-cyan-400 ring-4 ring-cyan-400/30'
                        : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-cyan-300'
                    }`} />
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-[10px] text-white/40 font-mono">
              Click depth to adjust submarine resonance
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          PHASE 05: MOST WANTED FRAGRANCES ("THE DEPTHS REVEAL")
          ========================================================================= */}
      <section
        id="scene-05"
        className="relative min-h-screen flex flex-col justify-between py-24 overflow-hidden border-t border-white/5 bg-[#02070A]"
      >
        {/* Deep Ocean Bed with Corals, Shells, and Sand Caustics (ocean_bed.png) */}
        <div 
          className="absolute inset-x-0 bottom-0 h-96 bg-cover bg-bottom z-10 pointer-events-none opacity-80"
          style={{
            backgroundImage: "url('/images/environments/ocean_bed.png')",
          }}
        />

        {/* Vertical Spotlight Beams from above */}
        <div className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-cyan-400/10 via-cyan-400/5 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-full bg-gradient-to-b from-blue-400/15 via-blue-400/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-32 h-full bg-gradient-to-b from-gold-400/10 via-gold-400/5 to-transparent blur-2xl pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-3 mb-12">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-xs font-mono tracking-[0.3em] text-gold-400 uppercase">
              05 / 07
            </span>
            <div className="w-8 h-px bg-gold-400/50" />
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/50">
              Most Wanted Collection
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-white font-light uppercase tracking-wider max-w-2xl mx-auto">
            The Depths Reveal What People Choose Most.
          </h2>

          <p className="text-xs sm:text-sm text-white/60 font-sans max-w-lg mx-auto">
            Suspended 40 meters underwater, illuminated by shafts of ocean light. Our four most demanded masterpieces.
          </p>
        </div>

        {/* 4 Suspended Floating Bottles */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-auto">
          
          {[
            { prod: imperialAmber, bgGlow: 'from-gold-500/20', note: 'Amber · Balsamic · Vanilla', col: 'text-gold-300' },
            { prod: oceanNoir, bgGlow: 'from-blue-500/20', note: 'Dark Sea · Cedar · Pepper', col: 'text-cyan-300' },
            { prod: emeraldOud, bgGlow: 'from-emerald-500/20', note: 'Cambodian Oud · Pine · Vetiver', col: 'text-emerald-300' },
            { prod: royalDamascus, bgGlow: 'from-rose-500/20', note: 'Taif Rose · Saffron · Smoked Woods', col: 'text-rose-300' },
          ].map((item, idx) => (
            <div
              key={item.prod.id}
              className="group relative rounded-3xl bg-black/60 border border-white/10 hover:border-gold-400/50 p-6 flex flex-col justify-between items-center text-center transition-all duration-500 shadow-2xl hover:-translate-y-2 backdrop-blur-md"
            >
              <div className={`absolute -inset-2 bg-radial ${item.bgGlow} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-xl`} />

              <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-white/40">
                Depth Flacon 0{idx + 1}
              </span>

              {/* Suspended Bottle */}
              <div 
                onClick={() => onSelectProduct(item.prod)}
                className="cursor-pointer relative h-52 sm:h-60 flex items-center justify-center my-4"
              >
                <img
                  src={item.prod.image}
                  alt={item.prod.name}
                  className="max-h-full object-contain group-hover:scale-110 group-hover:rotate-1 transition-transform duration-500 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div className="space-y-1.5 w-full">
                <h3 
                  onClick={() => onSelectProduct(item.prod)}
                  className="font-serif text-lg text-white group-hover:text-gold-300 transition-colors uppercase cursor-pointer"
                >
                  {item.prod.name}
                </h3>
                <p className={`text-xs ${item.col} font-mono tracking-wider`}>
                  {item.note}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-white/10 mt-3">
                  <span className="font-serif text-base text-gold-200">
                    ₨{item.prod.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => onAddToCart(item.prod, item.prod.sizes[0])}
                    className="p-2 rounded-full bg-gold-500/20 hover:bg-gold-500 border border-gold-400 text-gold-300 hover:text-black transition-colors"
                    title="Add to Selection"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className="relative z-20 text-center pt-8">
          <button
            onClick={() => setActiveView('shop')}
            className="px-8 py-3 rounded-full border border-white/20 hover:border-gold-400 text-white hover:text-gold-300 text-xs uppercase tracking-[0.25em] transition-all"
          >
            Explore Complete Most-Wanted Vault →
          </button>
        </div>
      </section>

      {/* =========================================================================
          PHASE 06: OUR STORY ("WHERE LOVE BECOMES PASSION")
          ========================================================================= */}
      <section
        id="scene-06"
        className="relative min-h-screen flex items-center py-24 overflow-hidden border-t border-white/5 bg-[#0A0D0A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono tracking-[0.3em] text-gold-400 uppercase">
                  06 / 07
                </span>
                <div className="w-8 h-px bg-gold-400/50" />
                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/50">
                  Our Story
                </span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl text-white font-light uppercase leading-tight">
                Where Love <br />
                <span className="italic font-normal text-gold-200">Becomes Passion</span>
              </h2>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans pt-2">
                From a lifelong love for fragrances to a brand built on authenticity, Ismaeel Muhammad brings you scents that tell a story.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => setActiveView('about')}
                  className="px-7 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs uppercase tracking-[0.25em] transition-all flex items-center space-x-2"
                >
                  <span>Learn More →</span>
                </button>
              </div>
            </div>

            {/* Center Founder Portrait in Studio */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group max-w-md">
                <img
                  src="/images/brand/founder_ismaeel.jpg"
                  alt="Founder Ismaeel Muhammad smelling perfume test strip"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-serif text-base text-white">Ismaeel Muhammad</p>
                  <p className="text-[10px] text-gold-400 font-mono uppercase tracking-widest">
                    In the Lahore Formulation Studio
                  </p>
                </div>
              </div>
            </div>

            {/* Right Story Chapters Selector */}
            <div className="lg:col-span-3 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400 block border-b border-white/10 pb-2">
                Story Chapters
              </span>

              <div className="space-y-2">
                {storyChapters.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveStoryChapter(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      activeStoryChapter === idx
                        ? 'border-gold-400 bg-gold-500/10 text-white'
                        : 'border-white/5 bg-black/40 text-white/50 hover:border-white/20 hover:text-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif tracking-wider uppercase font-medium">
                        {ch.title}
                      </span>
                      {activeStoryChapter === idx && <span className="text-gold-400 text-xs">●</span>}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Chapter Details */}
              <div className="bg-black/50 p-4 rounded-xl border border-white/5 text-xs text-white/70 leading-relaxed font-sans space-y-1">
                <p className="font-serif text-white font-medium text-sm">
                  {storyChapters[activeStoryChapter].heading}
                </p>
                <p className="text-white/60 text-[11px]">
                  {storyChapters[activeStoryChapter].content}
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          PHASE 07: COLLECTIONS (EDITORIAL PORTALS)
          ========================================================================= */}
      <section
        id="scene-07"
        className="relative py-24 overflow-hidden border-t border-white/5 bg-[#050806]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono tracking-[0.3em] text-gold-400 uppercase">
                  07 / 07
                </span>
                <div className="w-8 h-px bg-gold-400/50" />
                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/50">
                  Explore Our
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-light uppercase tracking-wider">
                Collections
              </h2>
            </div>

            <button
              onClick={() => setActiveView('shop')}
              className="mt-4 sm:mt-0 text-xs uppercase font-mono tracking-[0.25em] text-gold-300 hover:text-gold-200 flex items-center space-x-1.5 transition-colors group"
            >
              <span>View All Portals</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Large Editorial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {[
              {
                id: 'men',
                title: 'MEN',
                subtitle: 'BOLD & TIMELESS',
                image: '/images/collections/men.jpg',
                category: 'Men',
                desc: 'Smoked woods, Cambodian oud, and rugged leather.',
              },
              {
                id: 'women',
                title: 'WOMEN',
                subtitle: 'ELEGANT & RADIANT',
                image: '/images/collections/women.jpg',
                category: 'Women',
                desc: 'Taif rose, white peonies, lychee, and silken amber.',
              },
              {
                id: 'attars',
                title: 'ATTARS',
                subtitle: 'TRADITIONAL & PURE',
                image: '/images/collections/attars.jpg',
                category: 'Attars',
                desc: '0% alcohol concentrated pure perfume oils in crystal flacons.',
              },
              {
                id: 'discovery',
                title: 'DISCOVERY SET',
                subtitle: 'EXPLORE THE SPECTRUM',
                image: '/images/collections/discovery.jpg',
                category: 'Discovery',
                desc: '5 × 5ml deluxe flight with ₨1,000 credit voucher.',
              },
            ].map((col) => (
              <div
                key={col.id}
                onClick={() => {
                  if (onJumpToShopCategory) {
                    onJumpToShopCategory(col.category);
                  }
                  setActiveView('shop');
                }}
                className="group cursor-pointer relative rounded-3xl overflow-hidden border border-white/10 hover:border-gold-400/50 transition-all duration-500 shadow-2xl h-80 flex flex-col justify-end p-6"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage: `url('${col.image}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Card Content */}
                <div className="relative z-10 space-y-2">
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-gold-400">
                    {col.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl text-white group-hover:text-gold-300 transition-colors uppercase font-medium">
                    {col.title}
                  </h3>
                  <p className="text-[11px] text-white/60 line-clamp-2">
                    {col.desc}
                  </p>
                  <div className="pt-2 flex items-center space-x-1.5 text-xs text-gold-300 font-mono uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Explore Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
};
