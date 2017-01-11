export default class BuiltInScript {
  constructor (module) {
    this._module = module
  }

  load (callback) {
    switch (this._module) {
      case 'tweed': return callback(require('tweed'))
      case 'tweed/render/dom': return callback(require('tweed/render/dom'))

      default:
        throw new Error(`The external module '${module}' is not available in peek mode`)
    }
  }
}
