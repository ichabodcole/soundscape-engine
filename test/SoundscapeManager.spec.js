import { SoundscapeModuleManager } from '../src'

describe('SoundscapeModuleManager', () => {
  it('should maybe throw an error', () => {
    expect(function () {
      return new SoundscapeModuleManager()
    }).toThrow()
  })
})
