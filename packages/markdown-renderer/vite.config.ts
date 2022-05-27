import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'lib'),
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'markdown-renderer',
      fileName: (format) => `markdown-renderer.${format}.js`,
    },
    sourcemap: true,
  },
})
