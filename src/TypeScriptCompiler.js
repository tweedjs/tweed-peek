import { transpileModule } from 'typescript/lib/typescriptServices'
import config from 'tweed-typescript-config/config'

const { compilerOptions } = config

compilerOptions.module = 'system'

export default class TypeScriptCompiler {
  constructor (name = '<unknown>.tsx') {
    this._name = name
  }

  compile (code) {
    return transpileModule(
      code,
      {
        moduleName: this._name,
        compilerOptions
      }
    ).outputText
  }
}
