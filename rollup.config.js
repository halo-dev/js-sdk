import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { eslint } from "rollup-plugin-eslint"
import pkg from './package.json'

const browserName = 'HaloSDK'
const production = process.env.NODE_ENV === 'production'
const extensions = ['.js', '.ts', '.json']

export default {
  input: './src/index.ts',
  plugins: [
    resolve({
      extensions,
      mainFields: ['main', 'module', 'browser']
    }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'bundled',
      include: ['src/**/*'],
      exclude: 'node_modules/**'
    }),
    eslint({
      throwOnError: false,
      throwOnWarning: false,
      include: ['src/**'],
      exclude: ['node_modules/**']
    })
  ],

  output: [{
    file: pkg.main,
    format: 'cjs',
    sourcemap: !production
  }, {
    file: pkg.module,
    format: 'es',
    sourcemap: !production
  }, {
    file: pkg.browser,
    format: 'iife',
    name: browserName,
    sourcemap: !production
  }]
}
