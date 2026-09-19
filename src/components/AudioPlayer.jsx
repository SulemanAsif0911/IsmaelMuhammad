import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AudioPlayer = () => {
  const { isAudioPlaying, setIsAudioPlaying, activeScene } = useShop();
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const filterRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize Web Audio API ambient soundscape
  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Noise generator for wind / water resonance
      const bufferSize = ctx.sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.11;
        b2 = 0.86 * b2 + white * 0.25;
        output[i] = (b0 + b1 + b2) * 0.3;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Low pass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filterRef.current = filter;

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      // Gentle melodic crystal chimes occasionally
      const playChime = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chimeOsc.type = 'sine';
        // Pentatonic frequencies
        const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.5];
        const f = freqs[Math.floor(Math.random() * freqs.length)];
        chimeOsc.frequency.setValueAtTime(f, ctx.currentTime);

        chimeGain.gain.setValueAtTime(0.001, ctx.currentTime);
        chimeGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.5);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(masterGain);
        chimeOsc.start();
        chimeOsc.stop(ctx.currentTime + 5);

        timerRef.current = setTimeout(playChime, 4000 + Math.random() * 6000);
      };

      playChime();
      setIsAudioPlaying(true);
    } catch (e) {
      console.warn('Audio context initialization prevented:', e);
    }
  };

  const stopAudio = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      setTimeout(() => {
        try {
          if (ctx.state !== 'closed') ctx.close();
        } catch {}
        audioCtxRef.current = null;
      }, 1300);
    }
    setIsAudioPlaying(false);
  };

  const toggleAudio = () => {
    if (isAudioPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  // Adjust filter based on active scene (Forest vs Ocean)
  useEffect(() => {
    if (filterRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      if (activeScene >= 4 && activeScene <= 5) {
        // Ocean scene: deeper underwater resonance
        filterRef.current.frequency.setTargetAtTime(180, ctx.currentTime, 1.5);
      } else {
        // Forest / Story scene: airier breeze
        filterRef.current.frequency.setTargetAtTime(360, ctx.currentTime, 1.5);
      }
    }
  }, [activeScene]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-wider transition-all duration-300 border ${
        isAudioPlaying
          ? 'bg-[#d4af37]/15 border-[#d4af37]/40 text-[#f5e6b3]'
          : 'bg-black/30 hover:bg-black/50 border-white/10 text-white/60 hover:text-white'
      }`}
      title={isAudioPlaying ? 'Mute Scent Ambience' : 'Play Cinematic Fragrance Ambience'}
    >
      {isAudioPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-widest text-[#d4af37]">
            Ambience On
          </span>
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d4af37]"></span>
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-widest">
            Ambience
          </span>
        </>
      )}
    </button>
  );
};
