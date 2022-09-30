import 'dotenv/config';
import buble from '@rollup/plugin-buble';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: {
    file: 'public/halo-tracker.js',
    format: 'iife',
  },
  plugins: [
    replace({
      '/api/tracker': process.env.COLLECT_API_ENDPOINT || '/apis/api.halo.run/v1alpha1/trackers/counter',
      delimiters: ['', ''],
      preventAssignment: true,
    }),
    buble({ objectAssign: true }),
    terser({ compress: { evaluate: false } })
  ],
};
