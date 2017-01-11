export default class InlineScript {
  constructor (code) {
    this._code = code
  }

  load (callback) {
    callback(this._code)
  }

  get url () {
    return window.location.href
  }
}
