import ColorNoiseGen from 'colornoise-gen'

export default class ColorNoiseModule {
  constructor (audioCtx, masterGain, props) {
    const {
      noiseType,
      volume
    } = props

    this.ctx = audioCtx
    this.masterGain = masterGain

    this.gain = this.ctx.createGain()
    this.volume = volume

    this.generator = new ColorNoiseGen(this.ctx, { noiseType })
    this.generator.connect(this.gain)
    this.gain.connect(this.masterGain)
    this.generator.start()
  }

  set volume (value) {
    this.gain.gain.value = value
  }

  set noiseType (value) {
    this.generator.noiseType = value
  }

  destroy () {
    this.generator.stop()
    this.generator.disconnect()
    this.generator.remove()
  }
}
