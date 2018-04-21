import { Timer } from '@ichabodcole/timer'
import SoundscapeManager from './SoundscapeManager'

export default class SoundscapeConductor extends Timer {
  constructor (audioContext) {
    super()
    this.soundscapeManager = new SoundscapeManager(audioContext)
  }

  get currentTime () {
    return this.timeElapsed
  }

  set currentTime (value) {
    this.timeElapsed = value
  }

  set volume (value) {
    this.soundscapeManager.volume = value
  }

  start () {
    // console.debug('Soundscape | start()')
    super.start()
    this.soundscapeManager.connect()
  }

  stop () {
    // console.debug('Soundscape | stop()')
    super.stop()
    this.soundscapeManager.disconnect()
  }

  reset () {
    // console.debug('Soundscape | reset()')
    super.reset()
    this.soundscapeManager.disconnect()
  }

  addModule (module) {
    // console.debug('[Soundscape onAddModule] module', module)
    this.soundscapeManager.addModule(module)
  }

  removeModule (moduleId) {
    this.soundscapeManager.removeModule(moduleId)
  }

  updateModules (modules) {
    this.soundscapeManager.updateModules(modules)
  }
}
