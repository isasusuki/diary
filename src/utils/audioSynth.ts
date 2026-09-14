// Cute, soft Lo-Fi chime synthesizer using standard Web Audio API

class CozyAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private musicInterval: number | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play gentle cute pop when placing a sticker or clicking
  playCutePop() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Audio might be restricted until user gesture
    }
  }

  // Play gentle sparkle sound (e.g. liking, saving)
  playSparkle() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + idx * 0.06;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  // Soft ambient music box loops (pentatonic relaxing melody)
  toggleAmbientLofi(onStateChange?: (playing: boolean) => void) {
    if (this.isPlayingMusic) {
      this.stopAmbientLofi();
      onStateChange?.(false);
      return false;
    } else {
      this.startAmbientLofi();
      onStateChange?.(true);
      return true;
    }
  }

  startAmbientLofi() {
    this.init();
    if (!this.ctx) return;
    this.isPlayingMusic = true;

    // Sweet nostalgic music box notes (Pentatonic scale: F# minor / A major pentatonic)
    const melodyNotes = [440, 493.88, 554.37, 659.25, 739.99, 880, 987.77, 1108.73];
    let step = 0;

    const chords = [
      [220, 277.18, 329.63], // A
      [185, 220, 277.18],    // F#m
      [196, 246.94, 293.66], // G / D
      [220, 261.63, 329.63], // Am
    ];

    const playNote = () => {
      if (!this.isPlayingMusic || !this.ctx) return;
      const note = melodyNotes[Math.floor(Math.random() * melodyNotes.length)];
      const now = this.ctx.currentTime;

      // Soft music box bell oscillator
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);

      // Play soft bass chord pad every 4 steps
      if (step % 4 === 0) {
        const chord = chords[Math.floor(Math.random() * chords.length)];
        chord.forEach((freq) => {
          if (!this.ctx) return;
          const padOsc = this.ctx.createOscillator();
          const padGain = this.ctx.createGain();
          padOsc.type = 'triangle';
          padOsc.frequency.setValueAtTime(freq, now);

          padGain.gain.setValueAtTime(0.02, now);
          padGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

          padOsc.connect(padGain);
          padGain.connect(this.ctx.destination);

          padOsc.start(now);
          padOsc.stop(now + 2.0);
        });
      }

      step++;
    };

    playNote();
    this.musicInterval = window.setInterval(playNote, 600);
  }

  stopAmbientLofi() {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  isMusicPlaying() {
    return this.isPlayingMusic;
  }
}

export const cozyAudio = new CozyAudioEngine();
