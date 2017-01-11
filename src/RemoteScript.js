export default class RemoteScript {
  constructor (url) {
    this._url = url
  }

  load (callback) {
    const xhr = new window.XMLHttpRequest()
    xhr.open('GET', this._url, true)
    xhr.onload = () => callback(xhr.responseText)
    xhr.send()
  }

  get url () {
    return this._url
  }
}
