# vite-css-inject

## install

```sh
pnpm add -D @itsy/vite-css-inject
```

## use

```js
import { defineConfig } from 'vite'
import InjectCSS from '@itsy/vite-css-inject'

export default defineConfig({
  plugins: [InjectCSS()]
})
```

`InjectCSS` will only run during build-time, not in dev mode.
