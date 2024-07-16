//This file customizes Webpack config so the frontend can display without errors 
//(due to Webpack 5 > removal of Node.js polyfills). 
const webpack = require("webpack");

//fallbacks for Node.js modules Webpack 5 no longer includes polyfills for 
module.exports = function override(config, env) {
  config.resolve.fallback = {
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    util: require.resolve("util/"),
    zlib: require.resolve("browserify-zlib"),
    stream: require.resolve("stream-browserify"),
    url: require.resolve("url/"),
    assert: require.resolve("assert/"),
    process: require.resolve("process/browser"),
    buffer: require.resolve("buffer/"),
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
