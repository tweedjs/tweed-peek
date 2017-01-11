import InlineScript from './InlineScript'
import RemoteScript from './RemoteScript'
import BuiltInScript from './BuiltInScript'
import BabelCompiler from './BabelCompiler'
import TypeScriptCompiler from './TypeScriptCompiler'
import NullCompiler from './NullCompiler'

import Module from './Module'

const MimeType = {
  BABEL: 'application/javascript+tweed',
  TYPESCRIPT: 'application/typescript+tweed'
}

export default class ModuleFactory {
  fromUrl (url, mimeType = null) {
    if (!/https?:\/\//.test(url)) {
      return new Module(url, new BuiltInScript(url), new NullCompiler())
    }

    mimeType = mimeType || this._mimeTypeFromUrl(url)

    return new Module(url, new RemoteScript(url), this._compiler(url, mimeType))
  }

  fromCode (code, mimeType) {
    const url = window.location.href.replace(/\/?$/, '/__inline__')

    return new Module(url, new InlineScript(code), this._compiler(url, mimeType))
  }

  _mimeTypeFromUrl (url) {
    if (/\.jsx?$/.test(url)) {
      return MimeType.BABEL
    }

    if (/\.tsx?$/.test(url)) {
      return MimeType.TYPESCRIPT
    }

    if (/\/[^.]*$/.test(url)) {
      throw new Error(
        'In peek mode, files are imported dynamically in the browser, ' +
        `so omitting the file extension wont work. Try '${url}.js'`
      )
    }

    const [ , extension ] = /\.([^.]+)$/.exec(url)

    throw new Error(
      `${extension} is not a supported peek mode extension. ` +
      "Supported extensions are 'js', 'jsx', 'ts', and 'tsx'."
    )
  }

  _compiler (url, mimeType) {
    switch (mimeType) {
      case MimeType.BABEL:
        return new BabelCompiler()

      case MimeType.TYPESCRIPT:
        return new TypeScriptCompiler(url.split('/').pop())

      default:
        throw new Error(
          `${mimeType} is not a supported peek mode MIME type. ` +
          `Supported types are '${MimeType.BABEL}' and '${MimeType.TYPESCRIPT}'`
        )
    }
  }
}
