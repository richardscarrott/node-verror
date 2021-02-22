const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: "./src/index.js",
  // entry: "verror",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [new BundleAnalyzerPlugin()],
  // The original verror bundle size can be improved by un-commenting this but still not great.
  //   node: {
  //     // Webpack defaults
  //     // console: false,
  //     // global: true,
  //     // process: true,
  //     // __filename: 'mock',
  //     // __dirname: 'mock',
  //     // Buffer: true,
  //     // setImmediate: true,

  //     // CRA settings
  //     // dgram: 'empty',
  //     // fs: 'empty',
  //     // net: 'empty',
  //     // tls: 'empty',
  //     // child_process: 'empty',

  //     // This helps reduce the bundle from 25kb -> 8kb (min + gzip) but util
  //     // and assert still bloat the bundle.
  //     stream: "empty",
  //     Buffer: "mock",
  //   },
};
