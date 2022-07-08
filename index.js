import path from 'node:path'

const cssInjectorText = `
function injectStyle(css) {
  if (!css || typeof document === 'undefined') return

  // TODO make this work inside a WC
  const head = document.head
  const style = document.createElement('style')
  head.appendChild(style)
  style.appendChild(document.createTextNode(css))
}
`

export default () => {
  const transferred = []
  return {
    name: 'vite-css-inject',
    // special Vite property, only run this plugin when building
    apply: 'build',
    async transform(code, id) {
      if (path.extname(id) !== '.css') return null
      // store the CSS for later in the renderChunk hook
      transferred.push(code)
      // strip the CSS out of the build, otherwise Vite tries to handle it
      return { code: '', map: null }
    },
    // put the injectStyle function at the end of the chunk
    // automatically removed when not used
    footer: cssInjectorText,
    async renderChunk(code, chunk) {
      // inject CSS into the entry file only
      if (chunk.isEntry) {
        const injections = transferred.map(v => `injectStyle(\`${v}\`)`).join('\n')
        return { code: code + injections, map: null }
      }
    }
  }
}

