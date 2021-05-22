import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";
import pkg from "./package.json";

const browserName = "HaloSDK";
const production = process.env.NODE_ENV === "production";
const extensions = [".js", ".ts", ".json"];

export default {
  input: "./src/index.browser.ts",
  plugins: [
    terser(),
    resolve({
      extensions,
      mainFields: ["main", "module", "browser"],
    }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: "bundled",
      include: ["src/**/*"],
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
    }),
    eslint({
      throwOnError: false,
      throwOnWarning: false,
      include: ["src/**"],
      exclude: ["node_modules/**"],
    }),
  ],

  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: !production,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: !production,
    },
    {
      file: pkg.browser,
      format: "iife",
      name: browserName,
      plugins: [
        getBabelOutputPlugin({
          allowAllFormats: true,
        }),
      ],
      sourcemap: !production,
    },
  ],
};
