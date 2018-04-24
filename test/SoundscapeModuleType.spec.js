import { SoundscapeModuleType } from '../src/index.js'

describe('SoundscapeModuleType', () => {
  it('should have a COLOR_NOISE_MODULE', () => {
    expect(SoundscapeModuleType.COLOR_NOISE_MODULE).toBe('color-noise-module')
  })

  it('should have a COLOR_NOISE_MODULE', () => {
    expect(SoundscapeModuleType.BINAURAL_BEAT_MODULE).toBe('binaural-beat-module')
  })
})
