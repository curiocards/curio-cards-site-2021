const webpack = require("webpack");

// Webpack 5 no longer polyfills Node globals; @unstoppabledomains/resolution
// (via content-hash/multicodec) expects Buffer to exist in the browser.
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        buffer: require.resolve("buffer/"),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
  });
};
