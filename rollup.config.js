import path from "path";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";
import pkg from "./package.json";

// NOTE: Arguably we should create `extsprintf-lite` too and just alias
// `extsprintf` -> `extsprintf-lite` and make it external, but for now
// we're supporting `extsprintf`'s dependencies directly.
const aliases = {
  entries: [
    // https://github.com/joyent/node-verror/blob/master/lib/verror.js#L5
    {
      find: "assert-plus",
      replacement: path.resolve(__dirname, "./lib/assert-plus.js"),
    },
    // https://github.com/joyent/node-verror/blob/master/lib/verror.js#L6
    // https://github.com/joyent/node-extsprintf/blob/master/lib/extsprintf.js#L6
    { find: "util", replacement: path.resolve(__dirname, "./lib/util.js") },
    // https://github.com/joyent/node-verror/blob/master/lib/verror.js#L9
    {
      find: "core-util-is",
      replacement: path.resolve(__dirname, "./lib/core-util-is.js"),
    },
    // https://github.com/joyent/node-extsprintf/blob/master/lib/extsprintf.js#L5
    { find: "assert", replacement: path.resolve(__dirname, "./lib/assert.js") },
  ],
};

export default [
  // browser-friendly UMD build
  {
    input: "lib/verror.js",
    output: {
      name: "VError",
      file: pkg.browser,
      format: "umd",
      strict: false, // assert-plus uses fn.caller
    },
    plugins: [alias(aliases), resolve(), commonjs()],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "lib/verror.js",
    external: ["inherits"],
    output: [
      {
        file: pkg.main,
        format: "cjs",
        strict: false, // assert-plus uses fn.caller
      },
      // Have to use cjs as the SError, WError and MultiError aren't module.exports, they're static props on
      // the VError constructor.
      //   {
      //     file: pkg.module,
      //     format: "es",
      //     strict: false, // assert-plus uses fn.caller
      //   },
    ],
    plugins: [alias(aliases), resolve(), commonjs()],
  },
];
