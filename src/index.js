import System from './System'

import ModuleFactory from './ModuleFactory'

class Peek {
  static main () {
    const peek = new Peek()

    Array.prototype.slice
      .call(document.querySelectorAll('script'))
      .filter((s) => /\+tweed$/.test(s.type))
      .map(peek.run.bind(peek))
  }

  constructor () {
    this._moduleFactory = new ModuleFactory()
    this._system = new System(this._moduleFactory)
  }

  run (script) {
    const module = this._moduleFromScript(script)

    module.register(this._system, () => {
      this._system.execute()
    })
  }

  _moduleFromScript (script) {
    if (script.src) {
      return this._moduleFactory.fromUrl(String(script.src), script.type)
    }
    return this._moduleFactory.fromCode(script.text, script.type)
  }
}

window.addEventListener('DOMContentLoaded', Peek.main)
