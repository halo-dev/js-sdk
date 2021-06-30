import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";

const pkg = require("./package.json");
const depNames = Object.keys(pkg.dependencies);
const production = process.env.NODE_ENV === "production";

export function nodeConfig(test = false) {
  const externalNodeBuiltins = ["util", "os"];
  const baseConfig = {
    input: "./lib/index.js",
    external: depNames.concat(externalNodeBuiltins),
    output: { file: "cjs/index.js", format: "cjs", sourcemap: true },
    preserveSymlinks: false,
    plugins: [
      sourcemaps(),
      replace({
        delimiters: ["", ""],
        // replace dynamic checks with if (true) since this is for node only.
        // Allows rollup's dead code elimination to be more aggressive.
        "if (isNode)": "if (true)"
      }),
      nodeResolve({ preferBuiltins: true, mainFields: ["module"] }),
      cjs()
    ]
  };

  if (production) {
    baseConfig.plugins.push(terser());
  }

  return baseConfig;
}

export function browserConfig(test = false) {
  const baseConfig = {
    input: "./lib/index.browser.js",
    output: {
      file: "umd/logger.js",
      format: "umd",
      name: "Halo.Logger",
      sourcemap: true
    },
    preserveSymlinks: false,
    plugins: [
      sourcemaps(),
      replace(),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false
      }),
      cjs({
        namedExports: {
          chai: ["assert"],
          events: ["EventEmitter"],
          assert: [
            "ok",
            "deepEqual",
            "equal",
            "fail",
            "deepStrictEqual",
            "notDeepEqual",
            "throws"
          ]
        }
      })
    ]
  };
  if (production) {
    baseConfig.plugins.push(terser());
  }

  return baseConfig;
}
