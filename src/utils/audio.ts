// Web Audio procedural ambient sound engine for Ismaeel Muhammad cinematic journey
class AmbienceEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.12, now + 2.5); // soft subtle volume
      this.masterGain.connect(this.ctx.destination);

      // Low warm harmonic drone (65.4 Hz - C2)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(65.4, now);

      const droneGain1 = this.ctx.createGain();
      droneGain1.gain.setValueAtTime(0.35, now);
      this.droneOsc1.connect(droneGain1);
      droneGain1.connect(this.masterGain);

      // Fifth drone (98.0 Hz - G2)
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(98.0, now);

      const droneGain2 = this.ctx.createGain();
      droneGain2.gain.setValueAtTime(0.2, now);
      this.droneOsc2.connect(droneGain2);
      droneGain2.connect(this.masterGain);

      // Procedural soft pink/brown noise for forest wind / ocean currents
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.1;
      }

      const whiteNoiseSource = this.ctx.createBufferSource();
      whiteNoiseSource.buffer = noiseBuffer;
      whiteNoiseSource.loop = true;

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(450, now);
      this.filterNode.Q.setValueAtTime(1.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, now);

      whiteNoiseSource.connect(this.filterNode);
      this.filterNode.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();
      whiteNoiseSource.start();

      this.noiseNode = whiteNoiseSource;
      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public setEnvironmentFilter(freq: number) {
    if (this.filterNode && this.ctx) {
      this.filterNode.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.8);
    }
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      setTimeout(() => {
        try {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          (this.noiseNode as AudioBufferSourceNode)?.stop();
        } catch {
          // ignore
        }
        this.isPlaying = false;
      }, 1300);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const ambience = new AmbienceEngine();
