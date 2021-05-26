import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";
import pkg from "./package.json";
import replace from "rollup-plugin-replace";
import { ecmaVersionValidator } from "rollup-plugin-ecma-version-validator";

const production = process.env.NODE_ENV === "production";
const extensions = [".js", ".ts", ".json"];

export default {
  input: "./src/index.browser.ts",
  plugins: [
    terser(),
    resolve({
      extensions,
      browser: true,
    }),
    replace({
      PACKAGE_VERSION: JSON.stringify(pkg.version),
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
    ecmaVersionValidator(),
  ],

  output: {
    extend: true,
    file: `./dist/HaloRestAPIClient${production ? ".min" : ""}.js`,
    format: "umd",
    name: "window",
    sourcemap: production ? false : "inline",
  },
};
