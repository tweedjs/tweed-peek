import { transform } from 'babel-standalone'
import config from 'tweed-babel-config/config'

config.plugins.push('transform-es2015-modules-systemjs')

export default class BabelCompiler {
  compile (code) {
    return transform(code, config).code
  }
}
