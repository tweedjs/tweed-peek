export default class Module {
  constructor (url, script, compiler) {
    this._url = url
    this._script = script
    this._compiler = compiler
  }

  register (system, callback) {
    this._compile((code) => {
      if (typeof code !== 'string') {
        system._modules[this._url] = code
        return callback()
      }

      const module = new Function('System', code) // eslint-disable-line

      module(system.at(this._url, callback))
    })
  }

  _compile (callback) {
    this._script.load((code) =>
      callback(this._compiler.compile(code))
    )
  }
}
