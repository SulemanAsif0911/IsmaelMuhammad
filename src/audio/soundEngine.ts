// Web Audio API organic ambient sound engine for Ismaeel Muhammad fragrance journey

class FragranceSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  
  // Forest nodes
  private forestGain: GainNode | null = null;
  private forestNoiseNode: AudioNode | null = null;
  private forestFilter: BiquadFilterNode | null = null;
  private forestLfo: OscillatorNode | null = null;
  
  // Ocean nodes
  private oceanGain: GainNode | null = null;
  private oceanSubOsc: OscillatorNode | null = null;
  private oceanNoiseFilter: BiquadFilterNode | null = null;
  private oceanNoiseNode: AudioNode | null = null;

  private isInitialized = false;

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // --- FOREST AMBIANCE ---
      // White/Pink noise buffer
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.04;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Filter for forest wind
      this.forestFilter = this.ctx.createBiquadFilter();
      this.forestFilter.type = 'lowpass';
      this.forestFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
      this.forestFilter.Q.setValueAtTime(2.0, this.ctx.currentTime);

      // LFO to modulate wind breeze
      this.forestLfo = this.ctx.createOscillator();
      this.forestLfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(220, this.ctx.currentTime);
      this.forestLfo.connect(lfoGain);
      lfoGain.connect(this.forestFilter.frequency);

      this.forestGain = this.ctx.createGain();
      this.forestGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      noiseSource.connect(this.forestFilter);
      this.forestFilter.connect(this.forestGain);
      this.forestGain.connect(this.masterGain);

      noiseSource.start(0);
      this.forestLfo.start(0);
      this.forestNoiseNode = noiseSource;

      // --- OCEAN AMBIANCE ---
      // Low sub bass drone
      this.oceanSubOsc = this.ctx.createOscillator();
      this.oceanSubOsc.type = 'sine';
      this.oceanSubOsc.frequency.setValueAtTime(52, this.ctx.currentTime);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.oceanSubOsc.connect(subGain);

      // Ocean water noise filter
      const oceanNoiseSource = this.ctx.createBufferSource();
      oceanNoiseSource.buffer = noiseBuffer;
      oceanNoiseSource.loop = true;

      this.oceanNoiseFilter = this.ctx.createBiquadFilter();
      this.oceanNoiseFilter.type = 'bandpass';
      this.oceanNoiseFilter.frequency.setValueAtTime(180, this.ctx.currentTime);
      this.oceanNoiseFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      // Underwater wave swell LFO
      const oceanLfo = this.ctx.createOscillator();
      oceanLfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      const oceanLfoGain = this.ctx.createGain();
      oceanLfoGain.gain.setValueAtTime(110, this.ctx.currentTime);
      oceanLfo.connect(oceanLfoGain);
      oceanLfoGain.connect(this.oceanNoiseFilter.frequency);

      this.oceanGain = this.ctx.createGain();
      this.oceanGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

      oceanNoiseSource.connect(this.oceanNoiseFilter);
      this.oceanNoiseFilter.connect(this.oceanGain);
      subGain.connect(this.oceanGain);
      this.oceanGain.connect(this.masterGain);

      oceanNoiseSource.start(0);
      oceanLfo.start(0);
      this.oceanSubOsc.start(0);
      this.oceanNoiseNode = oceanNoiseSource;

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio not supported or failed to initialize', e);
    }
  }

  public toggleMute(): boolean {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.45;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.4);
    }
    return !this.isMuted;
  }

  public setEnvironmentMix(oceanProgress: number) {
    // oceanProgress: 0 = 100% forest, 1 = 100% ocean
    if (!this.ctx || !this.forestGain || !this.oceanGain) return;
    const clamped = Math.max(0, Math.min(1, oceanProgress));
    const now = this.ctx.currentTime;
    
    // Forest fades out as oceanProgress increases
    const fGain = Math.cos(clamped * 0.5 * Math.PI) * 0.7;
    // Ocean fades in as oceanProgress increases
    const oGain = Math.sin(clamped * 0.5 * Math.PI) * 0.75;
    
    this.forestGain.gain.setTargetAtTime(fGain, now, 0.3);
    this.oceanGain.gain.setTargetAtTime(oGain, now, 0.3);
  }

  public getIsPlaying(): boolean {
    return !this.isMuted && this.isInitialized;
  }
}

export const soundEngine = new FragranceSoundEngine();
