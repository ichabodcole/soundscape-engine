import BinauralBeatGen from 'binauralbeat-gen'

export default class BinauralBeatModule {
  constructor (audioCtx, masterGain, props) {
    const {
      waveType,
      pitch,
      beatRate,
      volume
    } = props

    this.ctx = audioCtx
    this.masterGain = masterGain

    this.gain = this.ctx.createGain()
    this.volume = volume

    this.generator = new BinauralBeatGen(this.ctx, { waveType, pitch, beatRate })
    this.generator.connect(this.gain)
    this.gain.connect(this.masterGain)
    this.generator.start()
  }

  set volume (value) {
    this.gain.gain.value = value
  }

  set waveType (value) {
    this.generator.waveType = value
  }

  set pitch (value) {
    this.generator.pitch = value
  }

  set beatRate (value) {
    this.generator.beatRate = value
  }

  destroy () {
    this.generator.stop()
    this.generator.disconnect()
  }
}
