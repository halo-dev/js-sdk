import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import replace from "rollup-plugin-replace";

const production = process.env.NODE_ENV === "production";
const extensions = [".js", ".ts", ".json"];

export default {
  input: "./src/AdminApiClient.ts",
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
    })
  ],

  output: {
    extend: true,
    file: `./dist/AdminApiClient${production ? ".min" : ""}.js`,
    format: "umd",
    name: "window",
    sourcemap: production ? false : "inline",
  },
};
