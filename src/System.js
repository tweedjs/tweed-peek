export default class System {
  constructor (moduleFactory) {
    this._moduleFactory = moduleFactory
    this._modules = {}
    this._executors = []
  }

  static boot (modules, callback) {
    const system = new System()

    modules.reduce((cb, module) =>
      () => module.register(system, cb),
      callback
    )
  }

  at (baseUrl, callback) {
    return {
      register: this.register.bind(this, baseUrl, callback)
    }
  }

  register (baseUrl, callback, name, dependencies, loader) {
    if (loader == null) {
      loader = dependencies
      dependencies = name
    }

    dependencies = dependencies
      .map((dep) => this._resolveUrl(baseUrl, dep))

    const exports = {}

    const { setters, execute } = loader((name, exported) => {
      exports[name] = exported
    })

    this._executors.unshift(() => {
      dependencies.forEach((dep, index) => {
        setters[index](this._modules[dep])
      })

      execute()
    })

    this._modules[baseUrl] = exports

    let callbacks = 0

    dependencies.forEach((dep) => {
      this._registerDependency(dep, () => {
        callbacks++
        if (callbacks === dependencies.length) {
          callback()
        }
      })
    })
  }

  _registerDependency (url, callback) {
    const module = this._moduleFactory.fromUrl(url)

    module.register(this, callback)
  }

  _resolveUrl (base, module) {
    if (!/^[./]/.test(module)) {
      return module
    }

    let segments = base.split('/')
    segments.pop() // CurrentScript.js
    segments.push(...module.split('/'))

    let result = []
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]

      if (segment === '.') {
        continue
      }

      if (segment === '..') {
        result.pop()
        continue
      }

      result.push(segment)
    }

    return result.join('/')
  }

  execute () {
    this._executors.forEach((e) => e())
  }
}
