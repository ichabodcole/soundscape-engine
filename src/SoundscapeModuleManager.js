import { instanceHasSetter } from './helpers'
import SoundscapeModuleType from './SoundscapeModuleType'
import {
  ColorNoiseModule,
  BinauralBeatModule
} from './audio-modules'

export default class SoundscapeModuleManager {
  constructor (audioContext, masterGain) {
    this.ctx = audioContext
    this.masterGain = masterGain
    this.modules = new Map()
  }

  addModule (id, type, props) {
    // console.log('[SoundscapeModuleManager addModule] id', id, 'type', type, 'props', props)
    const module = this.createModule(type, props)
    this.modules.set(id, module)
  }

  createModule (type, props) {
    // console.debug('[SoundscapeModuleManager createModule]', type, props)
    switch (type) {
      case SoundscapeModuleType.COLOR_NOISE_MODULE:
        return new ColorNoiseModule(this.ctx, this.masterGain, props)
      case SoundscapeModuleType.BINAURAL_BEAT_MODULE:
        return new BinauralBeatModule(this.ctx, this.masterGain, props)
    }
  }

  removeModule (id) {
    const module = this.modules.get(id)
    module.destroy()
    this.modules.delete(id)
  }

  updateModules (modulesData) {
    modulesData.forEach(moduleData => {
      this.updateModule(moduleData.id, moduleData.properties)
    })
  }

  updateModule (id, props) {
    if (!this.modules.has(id)) return
    const module = this.modules.get(id)

    Object.keys(props).forEach(propKey => {
      if (instanceHasSetter(module, propKey)) {
        module[propKey] = props[propKey]
      }
    })
  }

  destroy () {
    this.gainNode.disconnect()
  }
}
