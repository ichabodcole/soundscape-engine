import SoundscapeModuleManager from './SoundscapeModuleManager'

export default class SoundscapeManager {
  constructor (audioContext) {
    this.ctx = audioContext
    this.masterGain = this.ctx.createGain()
    this.moduleManager = new SoundscapeModuleManager(this.ctx, this.masterGain)
  }

  set volume (value) {
    this.masterGain.gain.value = value
  }

  connect () {
    this.masterGain.connect(this.ctx.destination)
  }

  disconnect () {
    this.masterGain.disconnect()
  }

  addModule (module) {
    // console.debug('[Soundscape onAddModule] module', module)
    const { id, type, properties } = module
    this.moduleManager.addModule(id, type, properties)
  }

  removeModule (moduleId) {
    this.moduleManager.removeModule(moduleId)
  }

  updateModules (modules) {
    this.moduleManager.updateModules(modules)
  }
}
